from celery import shared_task

from core.models import ScheduledPost, PublishedPost


@shared_task
def publish_scheduled_post(post_id):

    scheduled_post = None

    try:
        scheduled_post = ScheduledPost.objects.get(
            id=post_id
        )

        generated_post = (
            scheduled_post.generated_post
        )

        for platform in scheduled_post.platforms:

            platform_content = (
                generated_post.generated_posts.get(
                    platform,
                    generated_post.master_caption,
                )
            )

            PublishedPost.objects.create(
                generated_post=generated_post,
                platform=platform,
                content=platform_content,
                status="success",
            )

        scheduled_post.status = "published"

        scheduled_post.save(
            update_fields=["status"]
        )

        return {
            "status": "published",
            "scheduled_post_id": post_id,
        }

    except Exception as error:

        if scheduled_post:

            scheduled_post.status = "failed"

            scheduled_post.save(
                update_fields=["status"]
            )

        raise error