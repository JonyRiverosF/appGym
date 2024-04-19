from django.contrib import admin
from django.urls import path
from .views import pantalla,login,Solicitudes,Informes,Registro,ModificarU,CrearEjer,ModificarEjer,CrearDie,ModificarDie

urlpatterns =[
    path("",login,name="login"),
    path("pantalla",pantalla,name="pantalla"),
    
    path("Solicitudes",Solicitudes,name="Solicitudes"),
    path("Informes",Informes,name="Informes"),

    path("Registro",Registro,name="Registro"),
    path("ModificarU",ModificarU,name="ModificarU"),

    path("CrearEjer",CrearEjer,name="CrearEjer"),
    path("ModificarEjer",ModificarEjer,name="ModificarEjer"),

    path("CrearDie",CrearDie,name="CrearDie"),
    path("ModificarDie",ModificarDie,name="ModificarDie"),
]
