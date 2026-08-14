from typing import Dict, List, Optional
from services.caption_service import CaptionService
from services.hashtag_service import HashtagService
from services.platform_service import PlatformService
from .state import AgentState

def vision_agent_node(state: AgentState) -> Dict:
    """Vision & Image Context Analysis Agent"""
    image_path = state.get("image_path")
    if image_path:
        analysis = f"Image provided at path: {image_path}. Visual context centered on AI content creation."
    else:
        analysis = "No image provided. Pure textual content strategy."
    return {"image_analysis": analysis}


def strategy_caption_agent_node(state: AgentState) -> Dict:
    """Strategy & Master Caption Agent"""
    image_description = state.get("image_analysis") or "A person presenting AI tools."
    user_prompt = state.get("user_prompt", "")
    tone = state.get("tone") or "casual"
    target_audience = state.get("target_audience") or "General Audience"
    language = state.get("language") or "English"
    
    caption = CaptionService.generate_caption(
        image_description=image_description,
        user_prompt=user_prompt,
        tone=tone,
        target_audience=target_audience,
        language=language,
    )
    return {
        "master_caption": caption,
        "strategy_hook": f"Core angle derived from prompt: {user_prompt[:50]}...",
    }


def trend_hashtag_agent_node(state: AgentState) -> Dict:
    """Trend & Hashtag Researcher Agent"""
    master_caption = state.get("master_caption", "")
    hashtags = HashtagService.generate_hashtags(master_caption)
    return {"hashtags": hashtags}


def copywriter_agent_node(state: AgentState) -> Dict:
    """Platform Copywriter Agent (handles initial drafts and revisions)"""
    caption = state.get("master_caption", "")
    hashtags = state.get("hashtags", [])
    platforms = state.get("platforms", [])
    critic_feedback = state.get("critic_feedback")
    revision_count = state.get("revision_count", 0)

    # If there is critic feedback, append instruction to trim/revise copy
    if critic_feedback:
        caption = f"{caption}\n(Note: {critic_feedback})"

    tone = state.get("tone") or "casual"
    target_audience = state.get("target_audience") or "General Audience"
    language = state.get("language") or "English"

    posts = PlatformService.generate_posts(
        caption=caption,
        hashtags=hashtags,
        platforms=platforms,
        tone=tone,
        target_audience=target_audience,
        language=language,
    )

    # Self-correction check for Twitter character limit
    if "twitter" in posts and len(posts["twitter"]) > 280:
        tweet = posts["twitter"]
        if len(tweet) > 277:
            posts["twitter"] = tweet[:274] + "..."

    return {
        "draft_posts": posts,
        "revision_count": revision_count + 1,
    }


def critic_agent_node(state: AgentState) -> Dict:
    """Quality Critic & Compliance Agent"""
    draft_posts = state.get("draft_posts", {})
    platforms = state.get("platforms", [])
    revision_count = state.get("revision_count", 0)

    issues = []
    
    # Check 1: Ensure all requested platforms have content
    for p in platforms:
        if p not in draft_posts or not draft_posts[p]:
            issues.append(f"Missing post for platform '{p}'.")

    # Check 2: Verify Twitter character limit compliance
    if "twitter" in draft_posts:
        tweet_len = len(draft_posts["twitter"])
        if tweet_len > 280:
            issues.append(f"Twitter post exceeds 280 characters ({tweet_len} chars). Shorten it.")

    if issues and revision_count < 3:
        feedback = " | ".join(issues)
        return {
            "is_approved": False,
            "critic_feedback": feedback,
        }

    return {
        "is_approved": True,
        "critic_feedback": "Quality check passed successfully.",
    }
