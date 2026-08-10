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

        access_token = token.get("access_token")
        refresh_token = token.get("refresh_token")

        if access_token:
            try:
                profile = OAuthService.get_profile(platform, access_token)
                account_id = str(profile.get("id", profile.get("sub", "unknown")))
                
                # Check for Lite Profile name properties first, fallback to OIDC 'name'
                first_name = profile.get("localizedFirstName", "")
                last_name = profile.get("localizedLastName", "")
                if first_name or last_name:
                    account_name = f"{first_name} {last_name}".strip()
                else:
                    account_name = profile.get("name", f"{platform.capitalize()} User")

                from core.models import SocialAccount
                SocialAccount.objects.update_or_create(
                    platform=platform,
                    account_id=account_id,
                    defaults={
                        "account_name": account_name,
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "connected": True,
                    }
                )
            except Exception as e:
                # Fallback in case profile fetching fails
                from core.models import SocialAccount
                SocialAccount.objects.update_or_create(
                    platform=platform,
                    account_id="temp_id",
                    defaults={
                        "account_name": f"{platform.capitalize()} Connected Account",
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "connected": True,
                    }
                )

        from django.shortcuts import redirect
        return redirect("http://localhost:5174/settings")


class OAuthDisconnectAPIView(APIView):

    def delete(self, request, platform):

        result = OAuthService.disconnect(platform)

        return Response(
            result,
            status=status.HTTP_200_OK,
        )


class OAuthStatusAPIView(APIView):

    def get(self, request):
        from core.models import SocialAccount
        accounts = SocialAccount.objects.filter(connected=True)
        connected_platforms = {a.platform: True for a in accounts}
        return Response(connected_platforms, status=status.HTTP_200_OK)