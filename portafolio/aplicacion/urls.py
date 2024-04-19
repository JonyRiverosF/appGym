from django.contrib import admin
from django.urls import path
from .views import pantalla

urlpatterns =[
    path("",pantalla,name="algo")
]
