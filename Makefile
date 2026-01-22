dev:
	docker compose up -d --build
	docker compose logs -f

prod:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
	docker compose logs -f

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