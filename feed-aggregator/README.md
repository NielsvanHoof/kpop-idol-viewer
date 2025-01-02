# K-pop Feed Aggregator

A Python service that aggregates K-pop news and updates from various sources.

## Features
- Aggregates news from multiple K-pop news sources
- Supports RSS feeds and web scraping
- Stores data in a structured format
- Configurable update intervals

## Setup

1. Create a virtual environment:
```bash
python -m .venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure the environment:
- Copy `.env.example` to `.env`
- Update the configuration values as needed

4. Run the aggregator:
```bash
python -m src.main
```

## Project Structure
```
feed-aggregator/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── aggregator/
│   │   ├── __init__.py
│   │   └── feed_collector.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── feed_item.py
│   └── config/
│       ├── __init__.py
│       └── settings.py
├── requirements.txt
├── .env.example
└── README.md
``` 