from django.urls import path

from .oauth_views import (
    OAuthLoginAPIView,
    OAuthCallbackAPIView,
    OAuthDisconnectAPIView,
    OAuthStatusAPIView,
)

urlpatterns = [
    path("status/", OAuthStatusAPIView.as_view()),
    path("<str:platform>/login/", OAuthLoginAPIView.as_view()),
    path("<str:platform>/callback/", OAuthCallbackAPIView.as_view()),
    path("<str:platform>/disconnect/", OAuthDisconnectAPIView.as_view()),
]