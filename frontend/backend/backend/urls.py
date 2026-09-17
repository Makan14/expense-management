
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # j inclu ts ls liens du dossier api
    path('api/', include('api.urls')),
]
