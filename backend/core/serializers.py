from rest_framework import serializers
import os

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

        # Image is optional
        if image is None:
            return image

        # ---------- Allowed Extensions ----------
        allowed_extensions = [".jpg", ".jpeg", ".png"]

        extension = os.path.splitext(image.name)[1].lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError(
                "Only JPG, JPEG and PNG images are allowed."
            )

        # ---------- Maximum Size ----------
        max_size = 5 * 1024 * 1024  # 5 MB

        if image.size > max_size:
            raise serializers.ValidationError(
                "Image size must be less than 5 MB."
            )

        # ---------- MIME Type ----------
        allowed_types = [
            "image/jpeg",
            "image/png",
        ]

        if image.content_type not in allowed_types:
            raise serializers.ValidationError(
                "Invalid image type."
            )

        return image

class PublishSerializer(serializers.Serializer):
    platforms = serializers.ListField(
        child=serializers.CharField()
    )

    posts = serializers.DictField()