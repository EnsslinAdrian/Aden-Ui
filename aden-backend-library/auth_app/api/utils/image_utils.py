from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def optimize_user_image(image_field, user_pk):
    """
    Komprimiert und optimiert Profilbilder für den CustomUser.
    Liefert ein ContentFile zurück.
    """
    img = Image.open(image_field.path)

    # Transparenz entfernen (JPEG kann kein RGBA)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Größe begrenzen
    max_size = (512, 512)
    img.thumbnail(max_size)

    buffer = BytesIO()
    img.save(buffer, format="JPEG", quality=80)

    return ContentFile(buffer.getvalue(), name=f"{user_pk}_profile.jpg")
