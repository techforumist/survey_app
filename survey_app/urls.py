from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from polls.views import (
    QuestionViewSet,
    OptionViewSet,
    post_vote,
    vote_status,
    user_login,
    get_user,
    user_logout,
    post_question,
)

router = routers.DefaultRouter()
router.register("question", QuestionViewSet)
router.register("option", OptionViewSet)


urlpatterns = [
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api/vote", post_vote),
    path("api/user_login", user_login),
    path("api/user_logout/", user_logout),
    path("api/get_user/", get_user),
    path("api/vote-status/", vote_status),
    path("api/post_question/", post_question),
]
