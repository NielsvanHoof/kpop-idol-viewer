.PHONY: install install-dev run clean docker-build docker-run docker-dev docker-compose-up docker-compose-down lint format

# Development setup
install:
	python -m pip install -r requirements.txt

install-dev:
	python -m pip install -r requirements.dev.txt

# Running the application
run:
	PYTHONPATH=$(PWD) python src/main.py

# Cleaning
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete

# Docker commands
docker-build:
	docker build -t feed-aggregator .

docker-run:
	docker run -p 8000:8000 feed-aggregator

docker-dev:
	docker build -t feed-aggregator-dev -f Dockerfile.dev .

docker-compose-up:
	docker-compose up --build

docker-compose-down:
	docker-compose down

# Code quality
lint:
	pylint src/
	flake8 src/

format:
	black src/
	isort src/

# Help command
help:
	@echo "Available commands:"
	@echo "  install         - Install production dependencies"
	@echo "  install-dev     - Install development dependencies"
	@echo "  run            - Run the application"
	@echo "  clean          - Remove Python cache files"
	@echo "  docker-build   - Build production Docker image"
	@echo "  docker-run     - Run production Docker container"
	@echo "  docker-dev     - Build development Docker image"
	@echo "  docker-compose-up   - Start all services with Docker Compose"
	@echo "  docker-compose-down - Stop all services"
	@echo "  lint           - Run linting tools"
	@echo "  format         - Format code with black and isort"
