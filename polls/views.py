from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializer import QuestionSerializer, OptionSerializer
from . import models
import json
from django.contrib.auth.models import User
from rest_framework import status


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = QuestionSerializer


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = OptionSerializer

def vote_status(request):

    return HttpResponse('ok')
def postVote(request):
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
            return HttpResponse(vote, status=status.HTTP_403_FORBIDDEN)
        else:
            return HttpResponse(status=status.HTTP_403_FORBIDDEN)

    return HttpResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)

