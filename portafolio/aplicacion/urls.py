from django.contrib import admin
from django.urls import path
from .views import pantalla,login,formSesion,OlvidasteContra,   ListaCategorias,CrearMusculos,CrearMaquinas,CrearTiposDietas, Solicitudes,Informes,Reportes,VistaComentarios,  Registro,ListaUsu,ModificarU,   CrearEjer,ListaEje,ModificarEjer,   CrearDie,ListaDie,ModificarDie,  CrearNot,ListaNot,ModificarNot,desactivarNoticias,activarNoticias, ListaMaquinas,ListaTipoDietas,ListaMusculos, ModificarMusculos,ModificarTipoD,ModificarMaquinas

urlpatterns =[

    #Pantalla Principal
    path("pantalla",pantalla,name="pantalla"),


    #Informes y Comentarios
    path("Solicitudes",Solicitudes,name="Solicitudes"),
    path("Informes",Informes,name="Informes"),
    path("Reportes",Reportes,name="Reportes"),
    path("VistaComentarios",VistaComentarios,name="VistaComentarios"),


    #Usuario
    path("",login,name="login"),
    path("Registro",Registro,name="Registro"),
    path("ListaUsu",ListaUsu,name="ListaUsu"),
    path("ModificarU/<id>",ModificarU,name="ModificarU"),
    path("OlvidasteContra",OlvidasteContra,name="OlvidasteContra"),


    #Ejercicios
    path("CrearEjer",CrearEjer,name="CrearEjer"),
    path("ListaEje",ListaEje,name="ListaEje"),
    path("ModificarEjer/<id>",ModificarEjer,name="ModificarEjer"),


    #Dietas
    path("CrearDie",CrearDie,name="CrearDie"),
    path("ListaDie",ListaDie,name="ListaDie"),
    path("ModificarDie/<id>",ModificarDie,name="ModificarDie"),


    #Noticias
    path("CrearNot",CrearNot,name="CrearNot"),
    path("ListaNot",ListaNot,name="ListaNot"),
    path("ModificarNot/<id>",ModificarNot,name="ModificarNot"),
    path("desactivarNoticias/<id>",desactivarNoticias,name="desactivarNoticias"),
    path("activarNoticias/<id>",activarNoticias,name="activarNoticias"),


    #Crear Categorias
    path("CrearMusculos",CrearMusculos,name="CrearMusculos"),
    path("CrearMaquinas",CrearMaquinas,name="CrearMaquinas"),
    path("CrearTiposDietas",CrearTiposDietas,name="CrearTiposDietas"),


    #Listas Categorias
    path("ListaMaquinas",ListaMaquinas,name="ListaMaquinas"),
    path("ListaTipoDietas",ListaTipoDietas,name="ListaTipoDietas"),
    path("ListaMusculos",ListaMusculos,name="ListaMusculos"),


    #Modificar Categorias
    path("ModificarMusculos/<id>",ModificarMusculos,name="ModificarMusculos"),
    path("ModificarTipoD/<id>",ModificarTipoD,name="ModificarTipoD"),
    path("ModificarMaquinas/<id>",ModificarMaquinas,name="ModificarMaquinas"),

    #Forms
    path("formSesion",formSesion,name="formSesion"),



    path("ListaCategorias",ListaCategorias,name="ListaCategorias"),
    ]
