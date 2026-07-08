from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import GenerateSerializer
from services.image_service import ImageService
from services.caption_service import CaptionService
from services.hashtag_service import HashtagService
from services.platform_service import PlatformService
from services.social_media_service import SocialMediaService
from .response_serializers import GenerateResponseSerializer
from core.throttles import GenerateThrottle

class GenerateAPIView(APIView):
    throttle_classes = [GenerateThrottle]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        serializer = GenerateSerializer(data=request.data)

        if serializer.is_valid():

            result = SocialMediaService.generate(
                image=serializer.validated_data.get("image"),
                prompt=serializer.validated_data["prompt"],
                platforms=serializer.validated_data["platforms"],
            )

            response_serializer = GenerateResponseSerializer(data=result)
            response_serializer.is_valid(raise_exception=True)

            return Response(response_serializer.data)

        return Response(serializer.errors, status=400)