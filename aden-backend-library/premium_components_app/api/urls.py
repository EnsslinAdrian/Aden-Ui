from django.urls import path
from .views import get_component_file

urlpatterns = [
    path(
        "<str:category>/<str:component>/<str:version>/<str:filetype>",
        get_component_file
    ),
]
