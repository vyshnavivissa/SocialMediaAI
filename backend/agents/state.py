from typing import TypedDict, List, Dict, Optional

class AgentState(TypedDict):
    image_path: Optional[str]
    user_prompt: str
    tone: Optional[str]
    target_audience: Optional[str]
    language: Optional[str]
    platforms: List[str]
    image_analysis: Optional[str]
    master_caption: Optional[str]
    strategy_hook: Optional[str]
    hashtags: List[str]
    draft_posts: Dict[str, str]
    critic_feedback: Optional[str]
    is_approved: bool
    revision_count: int
    final_output: Optional[Dict]
