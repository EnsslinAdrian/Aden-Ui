#!/bin/sh
set -e
echo "Starting my application..."

python manage.py migrate
python manage.py collectstatic --noinput

echo "Attempting to create superuser..."
python manage.py shell <<'EOF' || true
import os
from django.contrib.auth import get_user_model

email = os.environ.get("SUPERUSER_EMAIL")
password = os.environ.get("SUPERUSER_PASSWORD")

if email and password:
    User = get_user_model()
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(email=email, password=password)
EOF

exec gunicorn config_app.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers ${GUNICORN_WORKERS} \
  --threads 2 \
  --timeout 60
