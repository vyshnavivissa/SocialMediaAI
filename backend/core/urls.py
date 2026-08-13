from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GenerateAPIView
from .publish_views import PublishAPIView
from .history_views import HistoryAPIView
from .auth_views import RegisterView, UserProfileView

urlpatterns = [
    # Auth endpoints
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="auth-login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="auth-refresh"),
    path("auth/me/", UserProfileView.as_view(), name="auth-me"),

    # Application endpoints
    path("generate/", GenerateAPIView.as_view()),
    path("publish/", PublishAPIView.as_view()),
    path("history/", HistoryAPIView.as_view(), name="history"),
]