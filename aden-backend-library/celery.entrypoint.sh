#!/bin/sh
set -e

echo "Starte Celery Worker..."
exec celery -A config_app worker -l info --concurrency 4
