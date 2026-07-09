from rest_framework.views import APIView

from rest_framework.response import Response

from rest_framework import status

from .serializers import SchedulePostSerializer

from services.schedule_service import ScheduleService

from .models import GeneratedPost
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ScheduledPost



class SchedulePostAPIView(APIView):

    def post(self, request):

        generated_post = GeneratedPost.objects.get(
            id=request.data["generated_post"]
        )

        schedule = ScheduleService.schedule_post(
            generated_post=generated_post,
            scheduled_time=request.data["scheduled_time"],
            platforms=request.data["platforms"],
        )

        serializer = SchedulePostSerializer(schedule)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
class ScheduleHistoryAPIView(APIView):

    def get(self, request):

        scheduled_posts = (
            ScheduledPost.objects
            .select_related("generated_post")
            .order_by("-created_at")
        )

        serializer = SchedulePostSerializer(
            scheduled_posts,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )