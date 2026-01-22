dev:
	docker compose up --build
	docker compose logs -f

prod:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
	docker compose logs -f

migrate:
	docker compose run --rm migrate

pull-prod:
	git pull origin main
	make prod

down:
	docker compose down

log:
	docker compose logs -f

stop:
	docker compose stop

restart:
	docker compose restart
	docker compose logs -f