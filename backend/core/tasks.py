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

        from services.publish_service import PublishService

        posts_to_publish = {}
        for platform in scheduled_post.platforms:
            platform_content = (
                generated_post.generated_posts.get(
                    platform,
                    generated_post.master_caption,
                )
            )
            posts_to_publish[platform] = platform_content

        results = PublishService.publish(
            generated_post_id=generated_post.id,
            posts=posts_to_publish,
        )

        # Check if any platform publishing failed
        has_failures = any(res.get("status") == "failed" for res in results.values())
        if has_failures:
            scheduled_post.status = "failed"
        else:
            scheduled_post.status = "published"

        scheduled_post.save(
            update_fields=["status"]
        )

        return {
            "status": scheduled_post.status,
            "scheduled_post_id": post_id,
            "results": results,
        }

    except Exception as error:

        if scheduled_post:

            scheduled_post.status = "failed"

            scheduled_post.save(
                update_fields=["status"]
            )

        raise error