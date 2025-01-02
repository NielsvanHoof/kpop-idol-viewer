"""
Main entry point for the K-pop Feed Aggregator.
"""
import logging
import schedule
import time
from threading import Thread
from dotenv import load_dotenv
from flask import Flask, jsonify

from src.aggregator.feed_collector import FeedCollector
from src.config.settings import Settings
from src.factories.feed_item_factory import FeedItemFactory

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

def run_feed_collector():
    load_dotenv()
    
    settings = Settings.from_env()
    feed_item_factory = FeedItemFactory()
    
    logger.info(f"Using RSS feeds: {settings.rss_feeds}")
    
    collector = FeedCollector(settings, feed_item_factory)
    
    def collect_feeds():
        try:
            collector.collect_all()
            logger.info("Successfully collected feeds")
        except Exception as e:
            logger.error(f"Error collecting feeds: {e}")
    
    schedule.every(settings.update_interval_minutes).minutes.do(collect_feeds)
    
    collect_feeds()
    
    while True:
        schedule.run_pending()
        time.sleep(1)
        
        
@app.route('/start', methods=['GET'])
def start():
    collector_thread = Thread(target=run_feed_collector, daemon=True)
    collector_thread.start()
    
    return jsonify({"status": "started"}), 200

@app.route('/feeds', methods=['GET'])
def get_feeds():
    return jsonify({"status": "feeds"}), 200


def main():
    settings = Settings.from_env()
    app.run(host=settings.api_host, port=settings.api_port)

if __name__ == "__main__":
    main() 