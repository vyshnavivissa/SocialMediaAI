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
class SocialAccount(models.Model):

    PLATFORM_CHOICES = [
        ("twitter", "Twitter"),
        ("linkedin", "LinkedIn"),
        ("facebook", "Facebook"),
        ("instagram", "Instagram"),
    ]

    platform = models.CharField(
        max_length=20,
        choices=PLATFORM_CHOICES,
    )

    account_name = models.CharField(
        max_length=255,
    )

    account_id = models.CharField(
        max_length=255,
    )

    access_token = models.TextField()

    refresh_token = models.TextField(
        blank=True,
        null=True,
    )

    connected = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.platform} - {self.account_name}"
class ScheduledPost(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("published", "Published"),
        ("failed", "Failed"),
    ]

    generated_post = models.ForeignKey(
        GeneratedPost,
        on_delete=models.CASCADE,
        related_name="scheduled_posts",
    )

    scheduled_time = models.DateTimeField()

    platforms = models.JSONField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"Scheduled #{self.id} - {self.status}"
