from rest_framework.views import APIView
from rest_framework.response import Response

from services.publish_service import PublishService

from .publish_serializers import (
    PublishSerializer,
    PublishResponseSerializer,
)
from core.throttles import PublishThrottle

class PublishAPIView(APIView):
    throttle_classes = [PublishThrottle]

    def post(self, request):

        serializer = PublishSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        result = PublishService.publish(
            generated_post_id=serializer.validated_data["generated_post_id"],
            posts=serializer.validated_data["posts"],
            )

        response = PublishResponseSerializer(
            data={
                "results": result
            }
        )

        response.is_valid(
            raise_exception=True
        )

        return Response(
            response.data
        )