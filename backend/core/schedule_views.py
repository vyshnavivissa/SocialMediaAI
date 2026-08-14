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
            user=request.user,
        )

        serializer = SchedulePostSerializer(schedule)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


from .serializers import SchedulePostSerializer, SchedulePostDetailSerializer

class ScheduleHistoryAPIView(APIView):

    def get(self, request):
        if request.user.is_authenticated:
            scheduled_posts = (
                ScheduledPost.objects
                .filter(user=request.user)
                .select_related("generated_post")
                .order_by("-scheduled_time")
            )
        else:
            scheduled_posts = (
                ScheduledPost.objects
                .all()
                .select_related("generated_post")
                .order_by("-scheduled_time")
            )

        serializer = SchedulePostDetailSerializer(
            scheduled_posts,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class ScheduleUpdateAPIView(APIView):

    def patch(self, request, pk):
        try:
            scheduled_post = ScheduledPost.objects.get(pk=pk)
        except ScheduledPost.DoesNotExist:
            return Response({"error": "Scheduled post not found"}, status=status.HTTP_404_NOT_FOUND)

        if "scheduled_time" in request.data:
            scheduled_post.scheduled_time = request.data["scheduled_time"]
        if "platforms" in request.data:
            scheduled_post.platforms = request.data["platforms"]
        if "status" in request.data:
            scheduled_post.status = request.data["status"]

        scheduled_post.save()

        serializer = SchedulePostDetailSerializer(scheduled_post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            scheduled_post = ScheduledPost.objects.get(pk=pk)
        except ScheduledPost.DoesNotExist:
            return Response({"error": "Scheduled post not found"}, status=status.HTTP_404_NOT_FOUND)

        scheduled_post.delete()
        return Response({"message": "Scheduled post deleted successfully"}, status=status.HTTP_200_OK)