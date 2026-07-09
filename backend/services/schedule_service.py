from datetime import datetime

from core.models import ScheduledPost

from core.tasks import publish_scheduled_post


class ScheduleService:

    @staticmethod
    def schedule_post(
        generated_post,
        scheduled_time,
        platforms,
    ):

        schedule = ScheduledPost.objects.create(
            generated_post=generated_post,
            scheduled_time=scheduled_time,
            platforms=platforms,
        )

        publish_scheduled_post.apply_async(
            args=[schedule.id],
            eta=scheduled_time,
        )

        return schedule