from django.db import models
from django.contrib.auth.models import User


class Question(models.Model):
    question = models.CharField(max_length=255)

    def __str__(self):
        return self.question


class Option(models.Model):
    option = models.CharField(max_length=225)
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="options"
    )

    def __str__(self):
        return self.option


class Vote(models.Model):
    question_id = models.IntegerField()
    optionFie_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

