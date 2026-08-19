import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
import dj_database_url



# ==========================================
# BASE DIRECTORY
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ==========================================
# SECURITY
# ==========================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-development-key",
)


DEBUG = os.getenv(
    "DEBUG",
    "True",
).lower() == "true"


ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    ".onrender.com",
]


# ==========================================
# APPLICATIONS
# ==========================================

INSTALLED_APPS = [

    "django.contrib.admin",

    "django.contrib.auth",

    "django.contrib.contenttypes",

    "django.contrib.sessions",

    "django.contrib.messages",

    "django.contrib.staticfiles",


    # Third-party applications

    "rest_framework",

    "rest_framework_simplejwt",

    "corsheaders",


    # Project applications

    "core",

    "mock_api",

]


# ==========================================
# MIDDLEWARE
# ==========================================

MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",


    # Serve static files on Render

    "whitenoise.middleware.WhiteNoiseMiddleware",


    # CORS middleware must be above CommonMiddleware

    "corsheaders.middleware.CorsMiddleware",


    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",

]


# ==========================================
# URL CONFIGURATION
# ==========================================

ROOT_URLCONF = "config.urls"


# ==========================================
# TEMPLATES
# ==========================================

TEMPLATES = [

    {

        "BACKEND":

            "django.template.backends.django.DjangoTemplates",


        "DIRS": [],


        "APP_DIRS": True,


        "OPTIONS": {

            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",

            ],

        },

    },

]


# ==========================================
# WSGI APPLICATION
# ==========================================

WSGI_APPLICATION = "config.wsgi.application"


# ==========================================
# DATABASE
# ==========================================

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
}


# ==========================================
# PASSWORD VALIDATION
# ==========================================

AUTH_PASSWORD_VALIDATORS = [

    {

        "NAME":

            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",

    },


    {

        "NAME":

            "django.contrib.auth.password_validation.MinimumLengthValidator",

    },


    {

        "NAME":

            "django.contrib.auth.password_validation.CommonPasswordValidator",

    },


    {

        "NAME":

            "django.contrib.auth.password_validation.NumericPasswordValidator",

    },

]


# ==========================================
# INTERNATIONALIZATION
# ==========================================

LANGUAGE_CODE = "en-us"


TIME_ZONE = "Asia/Kolkata"


USE_I18N = True


USE_TZ = True


# ==========================================
# STATIC FILES
# ==========================================

STATIC_URL = "/static/"


STATIC_ROOT = (

    BASE_DIR

    / "staticfiles"

)


# WhiteNoise static-file storage

STORAGES = {

    "default": {

        "BACKEND":

            "django.core.files.storage.FileSystemStorage",

    },


    "staticfiles": {

        "BACKEND":

            "whitenoise.storage.CompressedManifestStaticFilesStorage",

    },

}


# ==========================================
# MEDIA FILES
# ==========================================

MEDIA_URL = "/media/"


MEDIA_ROOT = (

    BASE_DIR

    / "uploads"

)


# ==========================================
# DEFAULT PRIMARY KEY
# ==========================================

DEFAULT_AUTO_FIELD = (

    "django.db.models.BigAutoField"

)


# ==========================================
# DJANGO REST FRAMEWORK
# ==========================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "EXCEPTION_HANDLER":
        "core.exception_handler.custom_exception_handler",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}


CORS_ALLOW_ALL_ORIGINS = True


CORS_ALLOW_CREDENTIALS = True


# ==========================================
# CSRF CONFIGURATION
# ==========================================

CSRF_TRUSTED_ORIGINS = [

    # Vercel frontend

    "https://social-media-ai-orpin.vercel.app",


    # Render backend

    "https://socialmediaai-rjry.onrender.com",

]


# ==========================================
# CELERY CONFIGURATION
# ==========================================

CELERY_BROKER_URL = os.getenv(

    "REDIS_URL",

    "redis://localhost:6379/0",

)


CELERY_RESULT_BACKEND = os.getenv(

    "REDIS_URL",

    "redis://localhost:6379/0",

)


CELERY_ACCEPT_CONTENT = [

    "json",

]


CELERY_TASK_SERIALIZER = (

    "json"

)


CELERY_RESULT_SERIALIZER = (

    "json"

)


CELERY_TIMEZONE = (

    "Asia/Kolkata"

)


CELERY_ENABLE_UTC = True


# ==========================================
# PRODUCTION SECURITY HEADERS & HARDENING
# ==========================================
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"
REFERRER_POLICY = "same-origin"