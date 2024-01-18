start:
	docker compose --env-file .exemple.env -f docker-compose.yml up -d --build
stop:
	docker compose --env-file .exemple.env -f docker-compose.yml down
destroy:
	docker compose --env-file .exemple.env -f docker-compose.yml down -v