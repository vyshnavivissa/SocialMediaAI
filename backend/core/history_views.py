from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import GeneratedPost

class HistoryAPIView(APIView):
    def get(self, request):
        posts = GeneratedPost.objects.all().order_by("-created_at")
        data = []
        for post in posts:
            published_records = post.published_posts.all()
            published_data = []
            for pub in published_records:
                published_data.append({
                    "platform": pub.platform,
                    "status": pub.status,
                    "published_at": pub.published_at
                })
            
            data.append({
                "id": post.id,
                "prompt": post.prompt,
                "master_caption": post.master_caption,
                "hashtags": post.hashtags,
                "generated_posts": post.generated_posts,
                "image": request.build_absolute_uri(post.image.url) if post.image else None,
                "created_at": post.created_at,
                "published_posts": published_data
            })
        return Response(data, status=status.HTTP_200_OK)
