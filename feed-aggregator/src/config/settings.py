"""
Configuration settings for the feed aggregator.
"""
import os
import json
from typing import List
from pydantic import BaseModel, Field

class Settings(BaseModel):
    """Application settings loaded from environment variables."""
    
    # Database settings
    database_url: str = Field(
        default="sqlite:///feeds.db",
        description="Database connection URL",
        alias="DATABASE_URL"
    )
    
    # Feed update settings
    update_interval_minutes: int = Field(
        default=30,
        description="Interval in minutes between feed updates",
        alias="UPDATE_INTERVAL_MINUTES"
    )
    
    # Feed sources
    rss_feeds: List[str] = Field(
        default=["https://www.soompi.com/feed"],
        description="List of RSS feed URLs to aggregate",
        alias="RSS_FEEDS"
    )
    
    # API settings
    api_host: str = Field(
        default="0.0.0.0",
        description="Host address for the API server",
        alias="API_HOST"
    )
    api_port: int = Field(
        default=8000,
        description="Port number for the API server",
        alias="API_PORT"
    )
    
    @classmethod
    def from_env(cls, env_file: str = ".env") -> "Settings":
        if os.path.exists(env_file):
            with open(env_file, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip() and not line.startswith('#'):
                        key, value = line.strip().split('=', 1)
                        os.environ[key] = value

        env_vars = {}
        for field in cls.model_fields:
            env_key = cls.model_fields[field].alias or field
            if env_key in os.environ:
                value = os.environ[env_key]
                if env_key == "RSS_FEEDS":
                    try:
                        value = json.loads(value)
                    except json.JSONDecodeError:
                        value = [value]
                env_vars[field] = value

        return cls(**env_vars)

    model_config = {
        "populate_by_name": True,
        "use_enum_values": True,
    } 