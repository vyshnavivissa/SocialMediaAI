from rest_framework import serializers
import os

from .models import ScheduledPost, GeneratedPost


class GeneratedPostDetailSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GeneratedPost
        fields = [
            "id",
            "prompt",
            "master_caption",
            "hashtags",
            "generated_posts",
            "tone",
            "target_audience",
            "language",
            "is_draft",
            "image_url",
            "created_at",
        ]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class SchedulePostSerializer(serializers.ModelSerializer):

    class Meta:

        model = ScheduledPost

        fields = "__all__"


class SchedulePostDetailSerializer(serializers.ModelSerializer):
    generated_post_details = GeneratedPostDetailSerializer(source="generated_post", read_only=True)

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
    tone = serializers.CharField(required=False, default="casual")
    target_audience = serializers.CharField(required=False, default="General Audience")
    language = serializers.CharField(required=False, default="English")
    is_draft = serializers.BooleanField(required=False, default=False)

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

class RefineSerializer(serializers.Serializer):
    platform = serializers.ChoiceField(choices=PLATFORM_CHOICES)
    content = serializers.CharField()
    action = serializers.ChoiceField(
        choices=[
            ("make_shorter", "Make Shorter"),
            ("more_engaging", "More Engaging"),
            ("add_cta", "Add Call to Action"),
            ("fix_grammar", "Fix Grammar"),
            ("change_tone", "Change Tone"),
            ("translate", "Translate"),
            ("custom", "Custom Instruction"),
        ]
    )
    target_tone = serializers.CharField(required=False, allow_blank=True)
    target_language = serializers.CharField(required=False, allow_blank=True)
    custom_instruction = serializers.CharField(required=False, allow_blank=True)