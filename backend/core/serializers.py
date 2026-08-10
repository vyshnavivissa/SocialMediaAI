from rest_framework import serializers
import os

from .models import ScheduledPost


class SchedulePostSerializer(serializers.ModelSerializer):

    class Meta:

        model = ScheduledPost

        fields = "__all__"

PLATFORM_CHOICES = [
    ("twitter", "Twitter"),
    ("instagram", "Instagram"),
    ("linkedin", "LinkedIn"),
    ("facebook", "Facebook"),
]
class GenerateSerializer(serializers.Serializer):

    image = serializers.ImageField(required=False)
    prompt = serializers.CharField(max_length=1000)

    platforms = serializers.ListField(
        child=serializers.ChoiceField(choices=PLATFORM_CHOICES),
        allow_empty=False,
    )

    def validate_image(self, image):
        # Allow any image by returning it directly
        return image

class PublishSerializer(serializers.Serializer):
    platforms = serializers.ListField(
        child=serializers.CharField()
    )

    posts = serializers.DictField()