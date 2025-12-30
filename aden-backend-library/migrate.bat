docker compose -f docker-compose.local.yml exec web python manage.py makemigrations
docker compose -f docker-compose.local.yml exec web python manage.py migrate