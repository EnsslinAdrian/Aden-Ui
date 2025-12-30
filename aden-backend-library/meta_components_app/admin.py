from django.contrib import admin
from .models import Component, ComponentLike

@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    # Was in der Liste angezeigt wird (Spalten)
    list_display = ('category', 'subcategory', 'title', 'slug', 'author', 'is_premium', 'likes_count', 'created_at')
    
    # Wonach man in der Übersicht suchen kann
    search_fields = ('category', 'subcategory', 'title', 'author__email', 'is_premium', 'author__username')
    
    # Filter-Leiste rechts
    list_filter = ('created_at', 'category', 'subcategory', 'author', 'is_premium')
    
    # DAS löst dein Problem: Macht aus dem Dropdown ein Suchfeld (AJAX)
    autocomplete_fields = ['author']
    
    # Macht Felder read-only, die man nicht manuell ändern sollte (optional)
    readonly_fields = ('likes_count',)


@admin.register(ComponentLike)
class ComponentLikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'component')
    
    # Auch hier: Suche statt Dropdown für User UND Component
    autocomplete_fields = ['user', 'component']