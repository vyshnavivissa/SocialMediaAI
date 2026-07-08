from django.urls import path

from .views import (
    TwitterMockAPIView,
    InstagramMockAPIView,
    LinkedInMockAPIView,
    FacebookMockAPIView,
)

urlpatterns = [

    path(
        "twitter/",
        TwitterMockAPIView.as_view(),
    ),

    path(
        "instagram/",
        InstagramMockAPIView.as_view(),
    ),

    path(
        "linkedin/",
        LinkedInMockAPIView.as_view(),
    ),

    path(
        "facebook/",
        FacebookMockAPIView.as_view(),
    ),
]