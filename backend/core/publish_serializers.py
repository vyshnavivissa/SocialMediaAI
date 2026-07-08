from rest_framework import serializers

PLATFORM_CHOICES = [
    ("twitter", "Twitter"),
    ("instagram", "Instagram"),
    ("linkedin", "LinkedIn"),
    ("facebook", "Facebook"),
]


class PublishSerializer(serializers.Serializer):

    generated_post_id = serializers.IntegerField()

    platforms = serializers.ListField(
        child=serializers.CharField()
    )

    posts = serializers.DictField()

    def validate(self, attrs):

        platforms = attrs["platforms"]
        posts = attrs["posts"]

        missing = [
            platform
            for platform in platforms
            if platform not in posts
        ]

        if missing:
            raise serializers.ValidationError(
                {
                    "posts": f"Missing posts for: {', '.join(missing)}"
                }
            )

        return attrs


class PublishStatusSerializer(serializers.Serializer):
    status = serializers.CharField()
    reason = serializers.CharField(required=False)
    platform = serializers.CharField(required=False)


class PublishResponseSerializer(serializers.Serializer):
    results = serializers.DictField(
        child=PublishStatusSerializer()
    )