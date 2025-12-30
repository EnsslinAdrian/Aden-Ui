from rest_framework.views import exception_handler
from rest_framework.exceptions import Throttled
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    if isinstance(exc, Throttled):
        wait = int(exc.wait)
        return Response(
        {
            "message": f"⚠️ Too many requests. Please try again in {wait} seconds.",
            "wait": wait
        },
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )

    # Default error handling for everything else
    return exception_handler(exc, context)

