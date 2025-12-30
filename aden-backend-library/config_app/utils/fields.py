from rest_framework import serializers

class AbsoluteImageUrlField(serializers.ImageField):
    def to_representation(self, value):
        if not value:
            return None 

        request = self.context.get("request")
        url = super().to_representation(value)

        if not url:
            return None

        return request.build_absolute_uri(url) if request else url


class AbsoluteFileUrlField(serializers.FileField):
    def to_representation(self, value):
        request = self.context.get("request")
        url = super().to_representation(value)
        return request.build_absolute_uri(url) if request else url