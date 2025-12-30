from django.urls import path
from .views import ComponentListView, ComponentDetailView, ComponentLikeToggleView, ComponentSaveToggleView

urlpatterns = [
    # Liste aller Komponenten
    path('', ComponentListView.as_view(), name='component-list'),

    # Detailansicht
    path('<slug:slug>/', ComponentDetailView.as_view(), name='component-detail'),
    
    # Actions
    path('<slug:slug>/like/', ComponentLikeToggleView.as_view(), name='component-like-toggle'),
    
    # NEU: Speichern Action
    path('<slug:slug>/save/', ComponentSaveToggleView.as_view(), name='component-save-toggle'),
]