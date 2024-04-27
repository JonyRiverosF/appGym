from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from pymongo import MongoClient
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate,login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

mongo=""
dataBase=""
usuarios=""

mongo = MongoClient("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")
dataBase = mongo["colinaGym"]
usuarios = dataBase["usuarios"]
print("Connected to the MongoDB database!")


# Create your views here.
def pantalla(request):
    return render(request,"aplicacion/inicio.html")

def login(request):
    logout(request)
    return render(request,"aplicacion/login.html")

def formSesion(request):
    try:
        vCorreo = request.POST['loginEmail']
        vClave = request.POST['loginPassword']
        registro = usuarios.find_one({"correo":vCorreo, "codigo":vClave})
        print(registro)

        if registro["rol"] == "2":
            return redirect('pantalla')
        elif registro["rol"] == "3":
            return redirect('VistaComentarios')  
        else:
            messages.success(request,"El usuario no tiene permitido acceder a estas paginas")
            return redirect('login')
            
    except:
            messages.error(request,"El usuario no existe")
            return redirect('login')
    
    

def OlvidasteContra(request):
    return render(request,"aplicacion/OlvidasteContra.html")




def Solicitudes(request):
    return render(request,"aplicacion/Solicitudes.html")

def Informes(request):
    return render(request,"aplicacion/Informes.html")

def Reportes(request):
    return render(request,"aplicacion/Reportes.html")

def VistaComentarios(request):
    return render(request,"aplicacion/VistaComentarios.html")




def Registro(request):
    return render(request,"aplicacion/RegistrarU.html")



    
        


def ListaUsu(request):

    Usuarios = usuarios.find({})

    contexto = {
        "usuarios": Usuarios
    }

    return render(request, "aplicacion/ListaUsu.html", contexto)

def ModificarU(request,id):

    
    Usuarios = usuarios.find_one({"codigo": id})
    
    print(Usuarios)

    contexto = {
        "usuarios": Usuarios
    }

    return render(request,"aplicacion/ModificarU.html", contexto)





def CrearEjer(request):
    return render(request,"aplicacion/CrearEje.html")

def ListaEje(request):
    return render(request,"aplicacion/ListaEje.html")

def ModificarEjer(request):
    return render(request,"aplicacion/ModificarEje.html")




def CrearDie(request):
    return render(request,"aplicacion/CrearDie.html")

def ListaDie(request):
    return render(request,"aplicacion/ListaDie.html")

def ModificarDie(request):
    return render(request,"aplicacion/ModificarDie.html")




def CrearNot(request):
    return render(request,"aplicacion/CrearNot.html")

def ListaNot(request):
    return render(request,"aplicacion/ListaNot.html")

def ModificarNot(request):
    return render(request,"aplicacion/ModificarNot.html")
