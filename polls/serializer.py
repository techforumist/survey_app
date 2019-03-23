from rest_framework.serializers import HyperlinkedModelSerializer
from . import models
class QuestionSerializer(HyperlinkedModelSerializer):
    class Meta:
        model= models.Question
        fields = ('id','question','url')

class OptionSerializer(HyperlinkedModelSerializer):
    class Meta:
        model= models.Option
        fields = ('id','option','url')
