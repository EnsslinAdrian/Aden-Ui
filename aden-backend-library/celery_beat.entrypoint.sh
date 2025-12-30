#!/bin/sh
set -e

echo "Starte Celery Beat..."
exec celery -A config_app beat -l info
