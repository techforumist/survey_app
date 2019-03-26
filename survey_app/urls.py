from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from django.views.generic.base import TemplateView

from rest_framework import routers
from polls.views import (
    index_view,
    QuestionViewSet,
    OptionViewSet,
    UserViewSet,
    post_vote,
    vote_status,
    user_login,
    get_user,
    user_logout,
    post_question,
    dash_bord_view,
)

router = routers.DefaultRouter()
router.register("question", QuestionViewSet)
router.register("option", OptionViewSet)
router.register("user", UserViewSet)


urlpatterns = [
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api/vote", post_vote),
    path("api/user_login", user_login),
    path("api/user_logout/", user_logout),
    path("api/get_user/", get_user),
    path("api/vote-status/", vote_status),
    path("api/post_question/", post_question),
    path("api/dash_bord_view/", dash_bord_view),
    url(r"^.*js|.*woff|.*css|.*ico|.*svg|.*ttf|.*map|", index_view, name="index"),
]
