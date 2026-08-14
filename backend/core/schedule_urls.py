from django.urls import path

from .schedule_views import (
    SchedulePostAPIView,
    ScheduleHistoryAPIView,
    ScheduleUpdateAPIView,
)


urlpatterns = [

    path(
        "",
        SchedulePostAPIView.as_view(),
        name="schedule-post",
    ),

    path(
        "history/",
        ScheduleHistoryAPIView.as_view(),
        name="schedule-history",
    ),

    path(
        "<int:pk>/",
        ScheduleUpdateAPIView.as_view(),
        name="schedule-update",
    ),

]