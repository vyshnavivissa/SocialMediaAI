from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import (
    GeneratedPost,
    PublishedPost,
    SocialAccount,
    ScheduledPost,
)

admin.site.register(GeneratedPost)
admin.site.register(PublishedPost)
admin.site.register(SocialAccount)
admin.site.register(ScheduledPost)