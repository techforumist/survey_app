from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializer import QuestionSerializer, OptionSerializer
from . import models
import json
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = QuestionSerializer


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = OptionSerializer


def postVote(request):
    if request.method == "POST":
        req = json.loads(request.body.decode("utf-8"))
        question_id = req['questionId']
        option_id = req['optionId']
        
    return HttpResponse("ok")

