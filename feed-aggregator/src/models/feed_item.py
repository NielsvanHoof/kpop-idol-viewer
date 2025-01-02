"""
Base model for feed items.
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class FeedItem(BaseModel):
    """Base model for feed items with common RSS fields."""
    
    title: str = Field(description="Title of the feed item")
    link: str = Field(description="URL link to the feed item")
    description: str = Field(description="Description or content of the feed item")
    guid: str = Field(description="Globally unique identifier for the feed item")
    pub_date: datetime = Field(description="Publication date of the feed item")
    
    # Optional common fields
    author: Optional[str] = Field(None, description="Author of the feed item")
    image_url: Optional[str] = Field(None, description="URL of the item's image")
    categories: List[str] = Field(default_factory=list, description="Categories or tags")
    
    # Source tracking
    source_feed: str = Field(description="URL of the source feed")
    feed_type: str = Field(description="Type of feed (e.g., 'rss', 'atom')")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "Example Feed Item",
                "link": "https://example.com/item/1",
                "description": "This is an example feed item",
                "guid": "unique-id-123",
                "pub_date": "2024-01-02T15:30:00Z",
                "author": "John Doe",
                "image_url": "https://example.com/image.jpg",
                "categories": ["news", "tech"],
                "source_feed": "https://example.com/feed.xml",
                "feed_type": "rss"
            }
        }
    } 