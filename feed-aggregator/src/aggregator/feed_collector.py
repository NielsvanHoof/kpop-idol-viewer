import logging
import feedparser
from datetime import datetime
from typing import List

from src.config.settings import Settings
from src.models.feed_item import FeedItem
from src.factories.feed_item_factory import FeedItemFactory

logger = logging.getLogger(__name__)

class FeedCollector:
    
    def __init__(self, settings: Settings, feed_item_factory: FeedItemFactory):
        self.settings = settings
        self.feed_item_factory = feed_item_factory
    
    def collect_all(self) -> List[FeedItem]:
        all_items: List[FeedItem] = []
        
        for feed_url in self.settings.rss_feeds:
            try:
                items = self._collect_from_rss(feed_url)
                all_items.extend(items)
                logger.info(f"Collected {len(items)} items from {feed_url}")
            except Exception as e:
                logger.error(f"Error collecting from {feed_url}: {e}")
        
        return all_items
    
    def _collect_from_rss(self, url: str) -> List[FeedItem]:
        feed = feedparser.parse(url)
        
        items = []
        
        for entry in feed.entries:            
            try:
                item = self.feed_item_factory.create_feed_item(feed.feed.title, entry)
                            
                logger.info(f"Collected item: {item}")
                
                items.append(item)
            except Exception as e:
                logger.error(f"Error processing entry from {url}: {e}")
        
        return items 
