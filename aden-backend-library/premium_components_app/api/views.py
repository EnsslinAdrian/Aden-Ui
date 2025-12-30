import os
from django.http import HttpResponse, Http404
from django.conf import settings

BASE_DIR = os.path.join(settings.BASE_DIR, "premium_components_app", "component_files")

def get_component_file(request, category, component, version, filetype):
    path = os.path.join(BASE_DIR, category, component, version, filetype)

    if not os.path.exists(path):
        raise Http404("File not found")

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    return HttpResponse(content, content_type="text/plain")
