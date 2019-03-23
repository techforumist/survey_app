from rest_framework.serializers import HyperlinkedModelSerializer
from . import models

class OptionSerializer(HyperlinkedModelSerializer):
    class Meta:
        model= models.Option
        fields = ('id','option','question','url')

class QuestionSerializer(HyperlinkedModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model= models.Question
        fields = ('id','question','options','url')


