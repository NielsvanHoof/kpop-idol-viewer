# generate ide helpers for laravel
generate-ide-helpers:
	@echo "Generating IDE helpers..."
	./vendor/bin/sail artisan ide-helper:eloquent
	./vendor/bin/sail artisan ide-helper:generate
	./vendor/bin/sail artisan ide-helper:meta
	./vendor/bin/sail artisan ide-helper:models --nowrite

# Run all tests
test:
	@echo "Running tests..."
	./vendor/bin/sail artisan test

# Run code style fixes
lint:
	@echo "Running code style fixes..."
	./vendor/bin/sail pint --test
	./vendor/bin/sail npm run lint
	./vendor/bin/sail npm run format

# Clear all caches
cache-clear:
	@echo "Clearing all caches..."
	./vendor/bin/sail artisan cache:clear
	./vendor/bin/sail artisan config:clear
	./vendor/bin/sail artisan route:clear
	./vendor/bin/sail artisan view:clear

# Fresh database with seeders
db-fresh:
	@echo "Refreshing database with seeders..."
	./vendor/bin/sail artisan migrate:fresh --seed

# Start development environment
dev:
	@echo "Starting development environment..."
	./vendor/bin/sail up -d
	./vendor/bin/sail npm run dev

# Build for production
build:
	@echo "Building for production..."
	./vendor/bin/sail npm run build
	./vendor/bin/sail artisan optimize
