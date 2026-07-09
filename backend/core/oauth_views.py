from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from oauth.oauth_service import OAuthService


class OAuthLoginAPIView(APIView):

    def get(self, request, platform):

        try:

            login_url = OAuthService.get_login_url(platform)

            return Response(
                {
                    "login_url": login_url,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:

            return Response(
                {
                    "error": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class OAuthCallbackAPIView(APIView):

    def get(self, request, platform):

        code = request.GET.get("code")

        if not code:

            return Response(
                {
                    "error": "Authorization code is missing."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = OAuthService.exchange_code(
            platform,
            code,
        )

        return Response(
            token,
            status=status.HTTP_200_OK,
        )


class OAuthDisconnectAPIView(APIView):

    def delete(self, request, platform):

        result = OAuthService.disconnect(platform)

        return Response(
            result,
            status=status.HTTP_200_OK,
        )