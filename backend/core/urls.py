from django.urls import path
from .views import GenerateAPIView
from .publish_views import PublishAPIView
from .history_views import HistoryAPIView

urlpatterns = [

    path(
        "generate/",
        GenerateAPIView.as_view(),
    ),

    path(
        "publish/",
        PublishAPIView.as_view(),
    ),

    path(
        "history/",
        HistoryAPIView.as_view(),
        name="history"
    ),
    
]