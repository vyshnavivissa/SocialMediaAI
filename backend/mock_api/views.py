from django.shortcuts import render

# Create your views here.
import random

from rest_framework.views import APIView
from rest_framework.response import Response


class TwitterMockAPIView(APIView):

    def post(self, request):

        return Response(
            {
                "status": "success",
                "platform": "twitter",
            }
        )


class InstagramMockAPIView(APIView):

    def post(self, request):

        return Response(
            {
                "status": "success",
                "platform": "instagram",
            }
        )


class LinkedInMockAPIView(APIView):

    def post(self, request):

        # simulate random failures

        if random.random() < 0.5:

            return Response(
                {
                    "status": "failed",
                    "reason": "Authentication Error",
                    "platform": "linkedin",
                }
            )

        return Response(
            {
                "status": "success",
                "platform": "linkedin",
            }
        )


class FacebookMockAPIView(APIView):

    def post(self, request):

        return Response(
            {
                "status": "success",
                "platform": "facebook",
            }
        )
