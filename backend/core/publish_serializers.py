from rest_framework import serializers

PLATFORM_CHOICES = [
    ("twitter", "Twitter"),
    ("instagram", "Instagram"),
    ("linkedin", "LinkedIn"),
    ("facebook", "Facebook"),
]


class PublishSerializer(serializers.Serializer):

    generated_post_id = serializers.IntegerField(required=False)
    platforms = serializers.ListField(
        child=serializers.CharField()
    )
    posts = serializers.DictField(required=False)

    def to_internal_value(self, data):
        # Ensure we have a mutable copy of data
        data_copy = dict(data)
        
        # Map frontend's "generated_post" to "generated_post_id"
        if "generated_post" in data_copy and "generated_post_id" not in data_copy:
            data_copy["generated_post_id"] = data_copy["generated_post"]
            
        # If posts is missing, load it from the database
        if "posts" not in data_copy and "generated_post_id" in data_copy and "platforms" in data_copy:
            try:
                from core.models import GeneratedPost
                gp = GeneratedPost.objects.get(id=data_copy["generated_post_id"])
                posts_dict = {}
                for p in data_copy["platforms"]:
                    posts_dict[p] = gp.generated_posts.get(p, gp.master_caption)
                data_copy["posts"] = posts_dict
            except Exception:
                pass
                
        return super().to_internal_value(data_copy)

    def validate(self, attrs):
        # Ensure generated_post_id exists
        if not attrs.get("generated_post_id"):
            raise serializers.ValidationError({"generated_post_id": "This field is required."})
            
        # Ensure posts dictionary exists
        if not attrs.get("posts"):
            raise serializers.ValidationError({"posts": "This field is required."})

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