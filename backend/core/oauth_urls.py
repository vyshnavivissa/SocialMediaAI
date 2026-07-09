from django.urls import path

from .oauth_views import (
    OAuthLoginAPIView,
    OAuthCallbackAPIView,
    OAuthDisconnectAPIView,
)

urlpatterns = [
    path("<str:platform>/login/", OAuthLoginAPIView.as_view()),
    path("<str:platform>/callback/", OAuthCallbackAPIView.as_view()),
    path("<str:platform>/disconnect/", OAuthDisconnectAPIView.as_view()),
]