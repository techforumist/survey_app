from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .serializer import (
    QuestionSerializer,
    OptionSerializer,
    OptionModelSerializer,
    QuestionModelSerializer,
)
from . import models
import json
from django.contrib.auth.models import User
from rest_framework import status

from django.contrib.auth import authenticate, login, logout
from django.db.models import Avg, Count, Min, Sum
from django.core import serializers


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = QuestionSerializer


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = OptionSerializer

def get_question_json(id):
    serializer = QuestionModelSerializer(
        models.Question.objects.filter(id=id), many=True
    )
    return serializer.data[0]

def get_user(request):
    user = request.user
    if user:
        return JsonResponse({"username": user.username, "id": user.id})
    else:
        return JsonResponse({})


def user_logout(request):
    logout(request)
    return JsonResponse({"message": "success"})


def user_login(request):
    req = json.loads(request.body.decode("utf-8"))
    username = req["username"]
    password = req["password"]

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        user = {}
    return JsonResponse({"username": user.username})


def vote_status(request):
    id = request.GET.get("id")
    votes = (
        models.Vote.objects.filter(question_id=id)
        .values("option_id")
        .annotate(count=Count("option_id"))
    )
    total_count = models.Vote.objects.filter(question_id=id).count()

    serializer = QuestionModelSerializer(
        models.Question.objects.filter(id=id), many=True
    )

    return JsonResponse(
        {"status": list(votes), "total": total_count, "question": serializer.data[0]}
    )


def post_vote(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            req = json.loads(request.body.decode("utf-8"))
            question_id = req["questionId"]
            option_id = req["optionId"]
            vote = models.Vote()
            vote.question_id = question_id
            vote.option_id = option_id
            vote.user = request.user
            vote.save()
            return HttpResponse(vote)
        else:
            return HttpResponse(status=status.HTTP_403_FORBIDDEN)

    return HttpResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)


def post_question(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            req = json.loads(request.body.decode("utf-8"))
            q = req["question"]
            ops = req["options"]
            question = models.Question()
            question.question = q
            question.save()

            for opt in ops:
                option = models.Option()
                option.option = opt
                option.question = question
                option.save()

            return JsonResponse(get_question_json(question.id))
        else:
            return HttpResponse(status=status.HTTP_403_FORBIDDEN)

    return HttpResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)

