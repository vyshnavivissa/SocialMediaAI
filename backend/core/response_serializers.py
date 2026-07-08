from rest_framework import serializers


class PlatformPostsSerializer(serializers.Serializer):
    twitter = serializers.CharField(required=False)
    instagram = serializers.CharField(required=False)
    linkedin = serializers.CharField(required=False)
    facebook = serializers.CharField(required=False)


class GenerateResponseSerializer(serializers.Serializer):

    id = serializers.IntegerField()

    image_path = serializers.CharField(
        required=False,
        allow_null=True,
    )

    master_caption = serializers.CharField()

    hashtags = serializers.ListField(
        child=serializers.CharField()
    )

    generated_posts = PlatformPostsSerializer()
class PublishStatusSerializer(serializers.Serializer):

    status = serializers.CharField()

    reason = serializers.CharField(
        required=False
    )


class PublishResponseSerializer(serializers.Serializer):

    results = serializers.DictField(
        child=PublishStatusSerializer()
    )