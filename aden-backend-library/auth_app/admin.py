from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # 1. Konfiguration für die Listenansicht (Tabelle)
    model = CustomUser
    list_display = ('email', 'first_name', 'last_name', 'plan', 'is_premium', 'is_active', 'is_staff', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'is_premium', 'plan')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    # 2. Konfiguration für das Bearbeiten-Formular
    # Da wir 'email' als Username nutzen, müssen wir die Fieldsets anpassen
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Persönliche Infos', {'fields': ('first_name', 'last_name', 'photo', 'bio', 'github_url', 'linkedin_url', 'username')}),
        ('Abo & Status', {'fields': ('plan', 'is_premium', 'lemon_customer_id', 'lemon_subscription_id', 'lemon_order_portal_url')}),
        ('Berechtigungen', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Wichtige Daten', {'fields': ('last_login', 'date_joined', 'updated_at')}),
    )

    # 3. Konfiguration für das Erstellen-Formular (User hinzufügen)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name'),
        }),
    )

    # Diese Felder sollen nur lesbar sein (werden automatisch gesetzt)
    readonly_fields = ('date_joined', 'updated_at', 'last_login')

# Das Model registrieren
admin.site.register(CustomUser, CustomUserAdmin)