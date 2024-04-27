from django.contrib import admin
from django.urls import path
from .views import pantalla,login,formSesion,OlvidasteContra,   Solicitudes,Informes,Reportes,VistaComentarios,  Registro,ListaUsu,ModificarU,   CrearEjer,ListaEje,ModificarEjer,   CrearDie,ListaDie,ModificarDie,  CrearNot,ListaNot,ModificarNot

urlpatterns =[

    path("",login,name="login"),
    path("formSesion",formSesion,name="formSesion"),

    path("pantalla",pantalla,name="pantalla"),
    path("OlvidasteContra",OlvidasteContra,name="OlvidasteContra"),
    
    path("Solicitudes",Solicitudes,name="Solicitudes"),
    path("Informes",Informes,name="Informes"),
    path("Reportes",Reportes,name="Reportes"),
    path("VistaComentarios",VistaComentarios,name="VistaComentarios"),

    path("Registro",Registro,name="Registro"),
    

    path("ListaUsu",ListaUsu,name="ListaUsu"),

    path("ModificarU/<id>",ModificarU,name="ModificarU"),

    path("CrearEjer",CrearEjer,name="CrearEjer"),
    path("ListaEje",ListaEje,name="ListaEje"),
    path("ModificarEjer",ModificarEjer,name="ModificarEjer"),

    path("CrearDie",CrearDie,name="CrearDie"),
    path("ListaDie",ListaDie,name="ListaDie"),
    path("ModificarDie",ModificarDie,name="ModificarDie"),

    path("CrearNot",CrearNot,name="CrearNot"),
    path("ListaNot",ListaNot,name="ListaNot"),
    path("ModificarNot",ModificarNot,name="ModificarNot"),

    ]
