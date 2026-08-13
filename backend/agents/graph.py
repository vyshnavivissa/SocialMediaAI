from typing import Dict, List, Optional
from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes import (
    vision_agent_node,
    strategy_caption_agent_node,
    trend_hashtag_agent_node,
    copywriter_agent_node,
    critic_agent_node,
)


def create_social_agent_graph():
    workflow = StateGraph(AgentState)

    # Add Agent Nodes
    workflow.add_node("vision_agent", vision_agent_node)
    workflow.add_node("strategy_caption_agent", strategy_caption_agent_node)
    workflow.add_node("trend_hashtag_agent", trend_hashtag_agent_node)
    workflow.add_node("copywriter_agent", copywriter_agent_node)
    workflow.add_node("critic_agent", critic_agent_node)

    # Set Entry Point
    workflow.set_entry_point("vision_agent")

    # Connect Edges
    workflow.add_edge("vision_agent", "strategy_caption_agent")
    workflow.add_edge("strategy_caption_agent", "trend_hashtag_agent")
    workflow.add_edge("trend_hashtag_agent", "copywriter_agent")
    workflow.add_edge("copywriter_agent", "critic_agent")

    # Conditional Reflection Edge
    def should_continue(state: AgentState) -> str:
        if state.get("is_approved"):
            return END
        if state.get("revision_count", 0) >= 3:
            return END
        return "copywriter_agent"

    workflow.add_conditional_edges(
        "critic_agent",
        should_continue,
        {
            END: END,
            "copywriter_agent": "copywriter_agent",
        },
    )

    return workflow.compile()


app_graph = create_social_agent_graph()


def run_social_media_agent_workflow(
    prompt: str,
    platforms: List[str],
    image_path: Optional[str] = None,
) -> Dict:
    initial_state: AgentState = {
        "image_path": image_path,
        "user_prompt": prompt,
        "platforms": platforms,
        "image_analysis": None,
        "master_caption": None,
        "strategy_hook": None,
        "hashtags": [],
        "draft_posts": {},
        "critic_feedback": None,
        "is_approved": False,
        "revision_count": 0,
        "final_output": None,
    }

    final_state = app_graph.invoke(initial_state)

    return {
        "master_caption": final_state.get("master_caption", ""),
        "hashtags": final_state.get("hashtags", []),
        "generated_posts": final_state.get("draft_posts", {}),
        "is_approved": final_state.get("is_approved", False),
        "revision_count": final_state.get("revision_count", 0),
        "critic_feedback": final_state.get("critic_feedback", ""),
    }
