import os

from pathlib import Path

from dotenv import load_dotenv


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

    "default": {

        "ENGINE":

            "django.db.backends.sqlite3",


        "NAME":

            BASE_DIR / "db.sqlite3",

    }

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

    "EXCEPTION_HANDLER":

        "core.exception_handler.custom_exception_handler",

}


# ==========================================
# CORS CONFIGURATION
# ==========================================

CORS_ALLOWED_ORIGINS = [

    # Local React frontend

    "http://localhost:5173",


    # Deployed Vercel frontend

    "https://social-media-ai-orpin.vercel.app",

]


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