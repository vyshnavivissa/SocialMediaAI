from django.db import models

# Create your models here.
class GeneratedPost(models.Model):

    image = models.ImageField(
        upload_to="generated_posts/",
        null=True,
        blank=True,
    )

    prompt = models.TextField()

    master_caption = models.TextField()

    hashtags = models.JSONField()

    generated_posts = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"Generated Post #{self.id}"
class PublishedPost(models.Model):

    PLATFORM_CHOICES = [
        ("twitter", "Twitter"),
        ("instagram", "Instagram"),
        ("linkedin", "LinkedIn"),
        ("facebook", "Facebook"),
    ]

    STATUS_CHOICES = [
        ("success", "Success"),
        ("failed", "Failed"),
    ]

    generated_post = models.ForeignKey(
        GeneratedPost,
        on_delete=models.CASCADE,
        related_name="published_posts",
    )

    platform = models.CharField(
        max_length=20,
        choices=PLATFORM_CHOICES,
    )

    content = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
    )

    published_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.platform} - {self.status}"
