from django.urls import path

from .schedule_views import (
    SchedulePostAPIView,
    ScheduleHistoryAPIView,
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

]