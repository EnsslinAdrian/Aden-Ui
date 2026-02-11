import os
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

def optimize_user_image(uploaded_file):
    # 🔥 Original-Dateiname ohne Extension
    base_name, _ = os.path.splitext(uploaded_file.name)

    img = Image.open(uploaded_file)

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    img.thumbnail((512, 512))

    buffer = BytesIO()
    img.save(buffer, format="JPEG", quality=80)

    return ContentFile(
        buffer.getvalue(),
        name=f"adenui_{base_name}.jpg"
    )
