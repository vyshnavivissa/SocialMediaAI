"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from django.conf import settings
from django.conf.urls.static import static
from django.urls import include
import os
from django.http import HttpResponse

from django.shortcuts import redirect

def index_view(request):
    candidate_paths = [
        os.path.join(settings.BASE_DIR, "frontend_dist", "index.html"),
        os.path.join(settings.BASE_DIR, "staticfiles", "index.html"),
        os.path.join(settings.BASE_DIR, "staticfiles", "frontend", "index.html"),
    ]
    for index_path in candidate_paths:
        if os.path.exists(index_path):
            with open(index_path, "r", encoding="utf-8") as f:
                return HttpResponse(f.read(), content_type="text/html")
    return HttpResponse("SocialMediaAI API is active. Visit /api/ for REST endpoints.", content_type="text/plain")

def assets_fallback_view(request, path):
    return redirect(f"/static/assets/{path}")

urlpatterns = [
    path("", index_view, name="index"),
    path("assets/<path:path>", assets_fallback_view, name="assets_fallback"),
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/oauth/", include("core.oauth_urls")),
    path("api/schedule/", include("core.schedule_urls")),
    path("oauth/", include("core.oauth_urls")),
    path("schedule/", include("core.schedule_urls")),
    path("mock/", include("mock_api.urls")),
    re_path(r"^.*$", index_view, name="spa-catchall"),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )