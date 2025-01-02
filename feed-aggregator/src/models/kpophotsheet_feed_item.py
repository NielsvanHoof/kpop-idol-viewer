"""
Specialized model for K-pop Hotsheet podcast feed items.
"""
from typing import Optional
from pydantic import Field

from .feed_item import FeedItem

class KpopHotsheetFeedItem(FeedItem):
    """Model for K-pop Hotsheet podcast episodes with additional podcast-specific fields."""
    
    # Podcast specific fields
    episode_number: int = Field(description="Episode number in the series")
    season_number: int = Field(description="Season number")
    duration_seconds: int = Field(description="Duration of the episode in seconds")
    audio_url: str = Field(description="URL to the audio file")
    audio_size: int = Field(description="Size of the audio file in bytes")
    audio_type: str = Field(description="MIME type of the audio file")
    explicit: bool = Field(description="Whether the episode contains explicit content")
    
    # Optional podcast fields
    transcript_url: Optional[str] = Field(None, description="URL to the episode transcript")
    chapters_url: Optional[str] = Field(None, description="URL to the episode chapters")
    episode_type: Optional[str] = Field(None, description="Type of episode (full, trailer, bonus)")
    itunes_title: Optional[str] = Field(None, description="iTunes specific title")
    itunes_image: Optional[str] = Field(None, description="iTunes specific image URL")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "2024 K-Pop Songs of the Year",
                "link": "https://rss.com/podcasts/kpophotsheet/1823023",
                "description": "In this episode, Robyn & Olivia celebrate the end of 2024...",
                "guid": "69833c66-4f2b-480f-b389-0d59697c3243",
                "pub_date": "2024-12-31T22:50:17Z",
                "author": "Robyn and Olivia",
                "image_url": "https://media.rss.com/kpophotsheet/20230106_100104_cad6cda574132363fef45e2a133f3812.jpg",
                "categories": ["Music", "Music Commentary", "Entertainment News"],
                "source_feed": "https://media.rss.com/kpophotsheet/feed.xml",
                "feed_type": "rss",
                "episode_number": 23,
                "season_number": 1,
                "duration_seconds": 3070,
                "audio_url": "https://media.rss.com/kpophotsheet/2024_12_31_22_50_03_31e4bf45-dda1-41d4-b573-cdc0e3a50177.mp3",
                "audio_size": 49132958,
                "audio_type": "audio/mpeg",
                "explicit": False,
                "transcript_url": "https://transcripts.rss.com/172229/1823023/transcript",
                "episode_type": "full"
            }
        }
    }
    
    @classmethod
    def from_rss_item(cls, item: dict, feed_url: str) -> "KpopHotsheetFeedItem":
        """Create a KpopHotsheetFeedItem from an RSS item dictionary."""
        # Extract episode and season numbers from itunes tags
        episode_number = int(item.get("itunes:episode", 0))
        season_number = int(item.get("itunes:season", 1))
        
        # Get enclosure details
        enclosure = item.get("enclosure", {})
        audio_url = enclosure.get("url", "")
        audio_size = int(enclosure.get("length", 0))
        audio_type = enclosure.get("type", "audio/mpeg")
        
        # Get duration in seconds
        duration_str = item.get("itunes:duration", "0")
        try:
            duration_seconds = int(duration_str)
        except ValueError:
            # Handle MM:SS or HH:MM:SS format
            parts = duration_str.split(":")
            if len(parts) == 2:  # MM:SS
                duration_seconds = int(parts[0]) * 60 + int(parts[1])
            elif len(parts) == 3:  # HH:MM:SS
                duration_seconds = int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
            else:
                duration_seconds = 0
        
        # Create the feed item
        return cls(
            title=item.get("title", "").strip("[]!CDATA"),
            link=item.get("link", ""),
            description=item.get("description", "").strip("[]!CDATA"),
            guid=item.get("guid", {}).get("text", item.get("guid", "")),
            pub_date=item.get("pubDate", ""),
            author=item.get("itunes:author", "Robyn and Olivia"),
            image_url=item.get("itunes:image", {}).get("href", ""),
            categories=[],  # Categories will be set from channel level
            source_feed=feed_url,
            feed_type="rss",
            episode_number=episode_number,
            season_number=season_number,
            duration_seconds=duration_seconds,
            audio_url=audio_url,
            audio_size=audio_size,
            audio_type=audio_type,
            explicit=item.get("itunes:explicit", "false").lower() == "true",
            transcript_url=item.get("podcast:transcript", {}).get("url"),
            chapters_url=item.get("podcast:chapters", {}).get("url"),
            episode_type=item.get("itunes:episodeType"),
            itunes_title=item.get("itunes:title", "").strip("[]!CDATA"),
            itunes_image=item.get("itunes:image", {}).get("href")
        )
