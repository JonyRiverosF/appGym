import requests
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from pymongo import MongoClient
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required



mongo=""
dataBase=""

usuarios=""

musculos=""
maquinas=""
ejercicios=""

tipoDietas=""
dietas=""

noticia=""

apiUrl = "http://192.168.1.2:3000";

mongo = MongoClient("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")

dataBase = mongo["colinaGym"]
usuarios = dataBase["usuarios"]

ejercicios = dataBase["ejercicios"]
musculos = dataBase["musculos"]
maquinas = dataBase["maquinas"]

tipoDietas = dataBase["tipodietas"]
dietas = dataBase["dietas"]

noticia = dataBase["noticias"]


print("Connected to the MongoDB database!")


# Create your views here.
def pantalla(request):
    return render(request, "aplicacion/inicio.html")


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
    
    contexto = {
        "usuarios": Usuarios
    }

    return render(request,"aplicacion/ModificarU.html", contexto)





def CrearEjer(request):

    Musculos = musculos.find({})
    Maquinas = maquinas.find({})

    contexto = {
        "Musculos": Musculos,
        "Maquinas":Maquinas
    }

    return render(request,"aplicacion/CrearEje.html",contexto)

def ListaEje(request):

    listaEje = ejercicios.find({})

    uwu=[]

    for x in listaEje:
        x["foto"] = apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
        
    print(uwu)
    contexto = {
        "listaEje": uwu
    }


    return render(request,"aplicacion/ListaEje.html",contexto)

def ModificarEjer(request, id):

    response = requests.post("http://192.168.1.2:3000/modificar/buscarEjercicio/" + id) 

    owo= response.json()
    
    print(owo["respuesta"][0])

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ owo["respuesta"][0]["foto"]
    owo["respuesta"][0]["video"] =  apiUrl+'/creacion/videos/'+ owo["respuesta"][0]["video"]

    print(owo)
    contexto = {
        "modificarE": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarEje.html",contexto)




def CrearDie(request):

    tipoDieta = tipoDietas.find({})

    contexto = {
        "Tipos":tipoDieta
    }

    return render(request,"aplicacion/CrearDie.html",contexto)

def ListaDie(request):

    listaD = dietas.find({})

    uwu=[]

    for x in listaD:
        x["foto"] = apiUrl+'/creacion/imagenes/Dietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
        
    print(uwu)
    contexto = {
        "listaD": uwu
    }

    return render(request,"aplicacion/ListaDie.html",contexto)

def ModificarDie(request, id):

    
    tipoDieta = tipoDietas.find({})

    response = requests.post("http://192.168.1.2:3000/modificar/buscarDietas/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ owo["respuesta"][0]["foto"]
    

    print(owo)
    contexto = {
        "modificarD": owo["respuesta"][0],
        "Tipos":tipoDieta
    }

    return render(request,"aplicacion/ModificarDie.html",contexto)




def CrearNot(request):
    return render(request,"aplicacion/CrearNot.html")

def ListaNot(request):

    listaN = noticia.find({})

    uwu=[]

    for x in listaN:
        x["foto"] = apiUrl+'/creacion/imagenes/FotosNoticia/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
        
    print(uwu)
    contexto = {
        "listaN": uwu
    }

    return render(request,"aplicacion/ListaNot.html",contexto)

def ModificarNot(request, id):

    response = requests.post("http://192.168.1.2:3000/modificar/buscarNoticia/" + id) 

    owo= response.json()
    
    print(owo["respuesta"][0])

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/FotosNoticia/'+ owo["respuesta"][0]["foto"]
    owo["respuesta"][0]["video"] =  apiUrl+'/creacion/videos/'+ owo["respuesta"][0]["video"]

    print(owo)
    contexto = {
        "modificarN": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarNot.html",contexto)



def CrearMusculos(request):
    return render(request,"aplicacion/CrearMusculos.html")

def CrearMaquinas(request):
    return render(request,"aplicacion/CrearMaquinas.html")

def CrearTiposDietas(request):
    return render(request,"aplicacion/CrearTiposDietas.html")

def ListaCategorias(request):

    Musculos = musculos.find({})
    Maquinas = maquinas.find({})
    tipodietas = tipoDietas.find({})

    uwu=[]
    owo=[]
    hola=[]

    for x in Musculos:
        x["foto"] = apiUrl+'/creacion/imagenes/fotosMusculos/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)

    for x in Maquinas:
        x["foto"] = apiUrl+'/creacion/imagenes/fotoMaquinas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        owo.append(x)

    for x in tipodietas:
        x["foto"] = apiUrl+'/creacion/imagenes/TipoDietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        hola.append(x)
        
    contexto = {
        "Musculos": uwu,
        "Maquinas": owo,
        "tipoD": hola,
    }

    return render(request,"aplicacion/ListaCategorias.html",contexto)




#No se utilizara Pero por seacaso
@login_required (login_url= 'login' )
def Reportes(request):
    return render(request,"aplicacion/Reportes.html")
