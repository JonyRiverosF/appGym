from django.contrib import admin
from django.urls import path

#Pantallas Principales
from .views import pantalla,Solicitudes,soli,Informes,Reportes,ListaCategorias,VistaComentarios,anularComentario,AdvertenciaComentario,CerrarGym
#Usuarios
from .views import Registro,ListaUsu,ModificarU,login,formSesion,OlvidasteContra,ActivarPagos
#Noticias
from .views import CrearNot,ListaNot,ModificarNot,desactivarNoticias,activarNoticias
#Dietas y Tipo de dietas
from .views import CrearDie,ListaDie,ModificarDie,activarDietas,desactivarDietas, CrearTiposDietas,ListaTipoDietas,ModificarTipoD,activarTipoD,desactivarTipoD
#Ejercicios y Musculos - Maquinas
from .views import CrearEjer,ListaEje,ModificarEjer,activarEjercicios,desactivarEjercicios, CrearMusculos,ListaMusculos,ModificarMusculos,activarMusculos,desactivarMusculos, CrearMaquinas,ListaMaquinas,ModificarMaquinas,activarMaquinas,desactivarMaquinas


urlpatterns =[

    #Pantalla Principal
    path("pantalla",pantalla,name="pantalla"),
    path("CerrarGym/<id>",CerrarGym,name="CerrarGym"),


    #Informes
    path("Solicitudes",Solicitudes,name="Solicitudes"),
    path("soli/<id>",soli,name="soli"),
    path("Informes",Informes,name="Informes"),


    #Comentarios
    path("VistaComentarios",VistaComentarios,name="VistaComentarios"),
    path("anularComentario/<id>",anularComentario,name="anularComentario"),
    path("AdvertenciaComentario/<id>",AdvertenciaComentario,name="AdvertenciaComentario"),


    #Usuario
    path("",login,name="login"),
    path("Registro",Registro,name="Registro"),
    path("ListaUsu",ListaUsu,name="ListaUsu"),
    path("ModificarU/<id>",ModificarU,name="ModificarU"),
    path("ActivarPagos",ActivarPagos,name="ActivarPagos"),
    path("OlvidasteContra",OlvidasteContra,name="OlvidasteContra"),


    #Ejercicios
    path("CrearEjer",CrearEjer,name="CrearEjer"),
    path("ListaEje",ListaEje,name="ListaEje"),
    path("ModificarEjer/<id>",ModificarEjer,name="ModificarEjer"),
    path("activarEjercicios/<id>",activarEjercicios,name="activarEjercicios"),
    path("desactivarEjercicios/<id>",desactivarEjercicios,name="desactivarEjercicios"),


    #Musculos
    path("CrearMusculos",CrearMusculos,name="CrearMusculos"),
    path("ListaMusculos",ListaMusculos,name="ListaMusculos"),
    path("ModificarMusculos/<id>",ModificarMusculos,name="ModificarMusculos"),
    path("activarMusculos/<id>",activarMusculos,name="activarMusculos"),
    path("desactivarMusculos/<id>",desactivarMusculos,name="desactivarMusculos"),


    #Maquinas
    path("CrearMaquinas",CrearMaquinas,name="CrearMaquinas"),
    path("ListaMaquinas",ListaMaquinas,name="ListaMaquinas"),
    path("ModificarMaquinas/<id>",ModificarMaquinas,name="ModificarMaquinas"),
    path("activarMaquinas/<id>",activarMaquinas,name="activarMaquinas"),
    path("desactivarMaquinas/<id>",desactivarMaquinas,name="desactivarMaquinas"),   


    #Dietas
    path("CrearDie",CrearDie,name="CrearDie"),
    path("ListaDie",ListaDie,name="ListaDie"),
    path("ModificarDie/<id>",ModificarDie,name="ModificarDie"),
    path("activarDietas/<id>",activarDietas,name="activarDietas"),
    path("desactivarDietas/<id>",desactivarDietas,name="desactivarDietas"),


    #Tipo de Dietas
    path("CrearTiposDietas",CrearTiposDietas,name="CrearTiposDietas"),
    path("ListaTipoDietas",ListaTipoDietas,name="ListaTipoDietas"),
    path("ModificarTipoD/<id>",ModificarTipoD,name="ModificarTipoD"),
    path("activarTipoD/<id>",activarTipoD,name="activarTipoD"),
    path("desactivarTipoD/<id>",desactivarTipoD,name="desactivarTipoD"),


    #Noticias
    path("CrearNot",CrearNot,name="CrearNot"),
    path("ListaNot",ListaNot,name="ListaNot"),
    path("ModificarNot/<id>",ModificarNot,name="ModificarNot"),
    path("activarNoticias/<id>",activarNoticias,name="activarNoticias"),
    path("desactivarNoticias/<id>",desactivarNoticias,name="desactivarNoticias"),
    
    
    #Forms
    path("formSesion",formSesion,name="formSesion"),


    #No se usan
    path("Reportes",Reportes,name="Reportes"),
    path("ListaCategorias",ListaCategorias,name="ListaCategorias"),
    ]
