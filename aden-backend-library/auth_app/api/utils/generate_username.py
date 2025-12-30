# auth_app/utils.py
from django.utils.text import slugify
from auth_app.models import CustomUser
import uuid

def generate_unique_username(first_name, last_name, email):
    """
    Generiert einen einzigartigen Username.
    Wandelt deutsche Umlaute (ä,ö,ü,ß) korrekt um.
    """
    
    def clean_german_chars(text):
        if not text: return ""
        text = text.lower()
        text = text.replace("ä", "ae")
        text = text.replace("ö", "oe")
        text = text.replace("ü", "ue")
        text = text.replace("ß", "ss")
        return text

    # Namen bereinigen
    f_name = clean_german_chars(first_name)
    l_name = clean_german_chars(last_name)
    email_base = clean_german_chars(email.split('@')[0])

    # Basis Slug bauen
    if f_name and l_name:
        base_slug = slugify(f"{f_name} {l_name}")
    elif f_name:
        base_slug = slugify(f_name)
    else:
        base_slug = slugify(email_base)

    if not base_slug:
        base_slug = "user"

    slug = base_slug
    counter = 1

    # Loop: Prüfen ob vergeben
    while CustomUser.objects.filter(username=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug