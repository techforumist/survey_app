from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from polls.views import QuestionViewSet, OptionViewSet,postVote,vote_status

router = routers.DefaultRouter()
router.register('question',QuestionViewSet)
router.register('option',OptionViewSet)


urlpatterns = [
    path('api/',include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/vote',postVote),
    path('api/vote-status/',vote_status),
]
