from django.db import models


class Question(models.Model):
    question = models.CharField(max_length=255)

class Option(models.Model):
    option = models.CharField(max_length=225)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)    
