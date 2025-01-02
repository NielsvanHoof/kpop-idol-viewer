from src.models.feed_item import FeedItem
from src.models.kpophotsheet_feed_item import KpopHotsheetFeedItem


class FeedItemFactory:
    def create_feed_item(self, feed_type: str, feed_item: dict) -> FeedItem:
        match feed_type:
            case "K-Pop Hotsheet":
                return KpopHotsheetFeedItem(**feed_item)
            case _:
                return FeedItem(**feed_item)
