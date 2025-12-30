# 🟩 Django Backend Blueprint

Diese README dient als **Schritt-für-Schritt-Anleitung** für neue Django-Backend-Projekte mit Docker, PostgreSQL, Redis, RQ, Debug Toolbar, CORS und automatischer Superuser-Erstellung.

---

## Starten
```bash
#trennt dein lokales Projekt von dem Template-Repo
git remote remove origin

# .env aus Vorlage erzeugen
cp .env.template .env

# Gitignore erweitern
# migrate.bat
# push.bat
# start.bat

#Secret key generieren
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

#Passwort generieren für SUPERUSER, DB_PASSWORD, REDIS_PASSWORD
python -c "import secrets, string; print(''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16)))"

#backend.entrypoint von CRLF auf LF umstellen

#Neue app erstellen Windows
./start.bat

#Neue app erstellen Linux
chmod 600 .env
chmod +x start.sh backend.entrypoint.sh
./start.sh
```



## 🚀 1. Virtuelle Umgebung & Django installieren
```bash
python -m venv env
env\Scripts\activate

python -m pip install --upgrade pip
pip install Django djangorestframework psycopg2-binary python-dotenv django-cors-headers django-debug-toolbar django-rq django-redis gunicorn whitenoise pytest pytest-django drf-spectacular drf-spectacular-sidecar

django-admin startproject config_app .
python manage.py startapp first_app
pip freeze > requirements.txt
```
---

## ⚙️ 2. `.env` Datei anlegen
```python
SECRET_KEY='django-insecure-xyz'
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:4200
CSRF_TRUSTED_ORIGINS=http://localhost:4200,http://127.0.0.1:4200

DJANGO_SUPERUSER_USERNAME='admin'
DJANGO_SUPERUSER_EMAIL='admin@example.com'
DJANGO_SUPERUSER_PASSWORD='supersecret'

DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432

REDIS_HOST=redis
REDIS_PASSWORD='myredispass'
REDIS_LOCATION='redis://:myredispass@redis:6379/1'
REDIS_PORT=6379
REDIS_DB=0

GUNICORN_WORKERS=1
```

---

## ⚙️ 3. `settings.py` anpassen

### `.env` laden:
```python
from pathlib import Path
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
```

### Apps & Middleware:
```python
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'django_rq',
    'corsheaders',
    'debug_toolbar',
    'whitenoise.runserver_nostatic',
    'drf_spectacular',
    'drf_spectacular_sidecar',
    'first_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    ...
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
```

### Sicherheit, DB, Redis:
```python
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG") == "True"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost").split(",")
CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS", "").split(",")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST", "db"),
        "PORT": os.getenv("DB_PORT", 5432),
    }
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.getenv("REDIS_LOCATION"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
        "KEY_PREFIX": "myproject"
    }
}

RQ_QUEUES = {
    'default': {
        'HOST': os.getenv("REDIS_HOST"),
        'PORT': os.getenv("REDIS_PORT"),
        'DB': os.getenv("REDIS_DB"),
        'DEFAULT_TIMEOUT': 900,
    },
}

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
```

### URLs anpassen:
```python
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from debug_toolbar.toolbar import debug_toolbar_urls
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    ...
] + staticfiles_urlpatterns()

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += debug_toolbar_urls()

urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
```


---

## 🧪 Testing Setup mit pytest-django

**1. `pytest.ini` im Projektroot anlegen:**  
```ini
[pytest]
DJANGO_SETTINGS_MODULE = config_app.settings
python_files = tests.py test_*.py *_tests.py
```

**2. In jeder App einen `tests/` Ordner anlegen:**  
```text
first_app/
└── tests/
    └── test_example.py
```

**3. Beispiel `test_example.py`:**  
```python
import pytest

@pytest.mark.django_db
def test_example():
    assert 1 + 1 == 2
```

**4. Tests ausführen:**  
```bash
pytest
```

---


## 🐳 4. Dockerfiles

### `backend.Dockerfile`:
```dockerfile
FROM python:3.12-slim
LABEL maintainer="Adrian Ensslin"
WORKDIR /app

COPY requirements.txt . 

RUN apt-get update &&     apt-get install -y --no-install-recommends         bash postgresql-client gcc libpq-dev build-essential redis-tools &&     pip install --upgrade pip &&     pip install --no-cache-dir -r requirements.txt &&     apt-get clean &&     rm -rf /var/lib/apt/lists/*

COPY . .

RUN chmod +x backend.entrypoint.sh
EXPOSE 8000
ENTRYPOINT [ "./backend.entrypoint.sh" ]
```

### `backend.entrypoint.sh`:
```sh
#!/bin/sh
set -e

echo "Warte auf PostgreSQL auf $DB_HOST:$DB_PORT..."
while ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -q; do
  echo "PostgreSQL ist nicht erreichbar - schlafe 1 Sekunde"
  sleep 1
done
echo "PostgreSQL ist bereit - fahre fort..."

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

python manage.py shell <<EOF
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
EOF

python manage.py rqworker default &
exec gunicorn config_app.wsgi:application --bind 0.0.0.0:8000
```
---

## 🐳 5. `docker-compose.yml`:
```yml
version: '3.9'

services:
  db:
    image: postgres:15
    container_name: myproject_db
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: myproject_redis
    command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}"]
    environment:
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

  web:
    build:
      context: .
      dockerfile: backend.Dockerfile
    env_file: .env
    container_name: myproject_backend
    volumes:
      - .:/app
      - ./media:/app/media
      - ./static:/app/static
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
  redis_data:
```
---

## ▶️ 6. Projekt starten:
```bash
docker-compose build
docker-compose up -d
docker-compose logs -f web
```
---

## 🧰 7. Extras
- **WhiteNoiseMiddleware** integriert für statische Dateien ohne Nginx.
- **django-debug-toolbar** integriert.
- **django-cors-headers** integriert.
- Redis + RQ integriert.
- Superuser wird automatisch erstellt.

---

