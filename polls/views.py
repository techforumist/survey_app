from django.shortcuts import render
from rest_framework import viewsets
from .serializer import QuestionSerializer,OptionSerializer
from . import models

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = QuestionSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = OptionSerializer