from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from . import models
from django.contrib.auth.models import User


class OptionSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.Option
        fields = ("id", "option", "question", "url")


class OptionModelSerializer(ModelSerializer):
    class Meta:
        model = models.Option
        fields = ("id", "option", "question")


class QuestionSerializer(HyperlinkedModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = models.Question
        fields = ("id", "question", "options", "url")

class QuestionModelSerializer(ModelSerializer):
    options = OptionModelSerializer(many=True)

    class Meta:
        model = models.Question
        fields = ("id", "question", "options")

class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","first_name","last_name","email","is_active","is_staff","is_superuser")