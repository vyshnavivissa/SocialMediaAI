from rest_framework.throttling import AnonRateThrottle


class GenerateThrottle(AnonRateThrottle):
    rate = "20/hour"


class PublishThrottle(AnonRateThrottle):
    rate = "50/hour"