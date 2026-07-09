from django.urls import path
from .views import GenerateAPIView
from .publish_views import PublishAPIView

urlpatterns = [

    path(
        "generate/",
        GenerateAPIView.as_view(),
    ),

    path(
        "publish/",
        PublishAPIView.as_view(),
    ),
    
]