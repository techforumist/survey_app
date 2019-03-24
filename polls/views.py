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

from django.contrib.auth import authenticate, login
from django.db.models import Avg, Count, Min, Sum
from django.core import serializers


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = QuestionSerializer


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = OptionSerializer


def get_user(request):
    user = request.user
    if user:
        return HttpResponse(user.username)
    else:
        return HttpResponse({})


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
    print(request.user)
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

