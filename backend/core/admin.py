from django.contrib import admin

# Register your models here.
from .models import (
    GeneratedPost,
    PublishedPost,
)


admin.site.register(GeneratedPost)
admin.site.register(PublishedPost)