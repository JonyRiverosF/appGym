import requests
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from pymongo import MongoClient
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from babel.dates import format_date
import locale
from collections import defaultdict
from datetime import datetime
from dateutil.relativedelta import relativedelta


mongo=""
dataBase=""

comentarios=""
horarios=""

usuarios=""
solicitudes=""

reportes=""

checkin=""
checkout=""

musculos=""
maquinas=""
ejercicios=""

tipoDietas=""
dietas=""

noticia=""
transacciones=""

apiUrl = "http://192.168.1.9:3000"

mongo = MongoClient("mongodb+srv://colinaGym:MaxiPug123@cluster0.ifkpyed.mongodb.net/colinaGym?retryWrites=true&w=majority")

dataBase = mongo["colinaGym"]
usuarios = dataBase["usuarios"]

transacciones = dataBase["transacciones"]
reportes = dataBase["reportes"]

ejercicios = dataBase["ejercicios"]
musculos = dataBase["musculos"]
maquinas = dataBase["maquinas"]

checkin = dataBase["checkins"]
checkout = dataBase["checkouts"]

tipoDietas = dataBase["tipodietas"]
dietas = dataBase["dietas"]

noticia = dataBase["noticias"]
solicitudes=dataBase["solicitudes"]

comentarios= dataBase["comentarios"]
horarios=dataBase["horarios"]


print("Connected to the MongoDB database!")


#Pantallas Principales
def pantalla(request):

    Ingreso = checkin.find({"estado": "activo"})
   
    num_personas = checkin.count_documents({"estado": "activo"})

    uwu=[]

    for x in Ingreso:
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)

    contexto = {
        "chekin": uwu,
        "num_personas": num_personas
    }

    return render(request, "aplicacion/inicio.html",contexto)

def CerrarGym(request,id):

    Ingreso = checkin.find({"estado": "activo"})

    num_personas = checkin.count_documents({"estado": "activo"})

    response = requests.post( apiUrl + "/validaciones/CerrarGym/" + id) 
   

    uwu=[]

    for x in Ingreso:
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)

    contexto = {
        "chekin": uwu,
        "num_personas": num_personas
    }

    return redirect("pantalla")

def login(request):
    logout(request)
    return render(request,"aplicacion/login.html")

def formSesion(request):
    try:
        vCorreo = request.POST['loginEmail']
        vClave = request.POST['loginPassword']
        registro = usuarios.find_one({"correo":vCorreo, "codigo":vClave})

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

    Solicitud=solicitudes.find({"estado":"pendiente"})

    uwu=[]
    
    for x in Solicitud:
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)

    contexto={
        "soli":uwu
    }

    return render(request,"aplicacion/Solicitudes.html",contexto)

def soli(request,id):

    response = requests.post( apiUrl + "/consultas/responderSoli/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]

    
    contexto = {
        "solicitud": owo["respuesta"][0]
    }
    
    return render(request,"aplicacion/soli.html",contexto)

def Informes(request):

    Comentarios = comentarios.find({})
    Horarios = horarios.find({"vigencia": True})
    Trans = transacciones.find({"estado": "Pago exitoso"}) 

    nombre = []
    for h in Horarios:
        dias = format_date(h["fecha"], format='full', locale='es_ES')
        for hora in h["horas"]:
            hola = hora["cuposMaximos"] - hora["cuposElegidos"]
            hora["cuposDisponibles"] = hola
        h["dia"] = dias.split(",")[0]
        nombre.append(h)

    montos_por_mes = defaultdict(int)
    usuarios_por_mes = defaultdict(int)

    for t in Trans:
        mes = t["fechaPago"].strftime('%B %Y')
        montos_por_mes[mes] += t["monto"]

    for mes in montos_por_mes:
        inicio_mes = datetime.strptime(mes, '%B %Y')
        fin_mes = inicio_mes + relativedelta(months=1)
        usuarios_por_mes[mes] = usuarios.count_documents({"fecha_registro": {"$gte": inicio_mes, "$lt": fin_mes}})

    meta_fija_junio = 72500

    total_usuarios_julio = usuarios.count_documents({})
    meta_ajustada_julio = total_usuarios_julio * 14500

    locale.setlocale(locale.LC_ALL, 'es_CL.UTF-8')
    for mes in montos_por_mes:
        montos_por_mes[mes] = locale.currency(montos_por_mes[mes], symbol='', grouping=True).replace('.', ',') + ' CLP'

    informe_bancario = []
    for mes in montos_por_mes:
        if mes == 'junio 2024':
            meta = locale.currency(meta_fija_junio, symbol='', grouping=True).replace('.', ',') + ' CLP'
        else:
            meta = locale.currency(meta_ajustada_julio, symbol='', grouping=True).replace('.', ',') + ' CLP'
        
        informe_bancario.append({
            "mes": mes,
            "monto": montos_por_mes[mes],
            "meta": meta
        })

    contexto = {
        "comentarios": Comentarios,
        "horarios": nombre,
        "informe_bancario": informe_bancario,
        "meta_fija_junio": locale.currency(meta_fija_junio, symbol='', grouping=True).replace('.', ',') + ' CLP'
    }

    return render(request, "aplicacion/Informes.html", contexto)















#Comentarios
def VistaComentarios(request):

    Reportes = reportes.find({"estado": "activo"})
    reportesitos = reportes.find({"estado":"desactivado"}) 

    uwu=[]
    
    ruts=[]
    usuariosA =[] 
    for reporte in Reportes:
        reporte["_id"] = str(reporte["_id"]); reporte["id"] = str(reporte["_id"])
        uwu.append(reporte)
        if not reporte['rut'] in ruts:  
            ruts.append(reporte['rut'])
            usuariosA.append(usuarios.find_one({'rut':reporte['rut']}))
            
    contexto={
        "report":uwu,
        "usuariosA":usuariosA,
        "Revisados":reportesitos
    }
    
    return render(request,"aplicacion/VistaComentarios.html", contexto)

def anularComentario(request,id):

    response = requests.post( apiUrl + "/modificar/anularComentario/" + id) 

    Reportes=reportes.find({"estado": "activo"})
   
    uwu=[]
    
    ruts=[]
    usuariosA =[] 
    for reporte in Reportes:
        reporte["_id"] = str(reporte["_id"]); reporte["id"] = str(reporte["_id"])
        uwu.append(reporte)
        if not reporte['rut'] in ruts:  
            ruts.append(reporte['rut'])
            usuariosA.append(usuarios.find_one({'rut':reporte['rut']}))
            
    contexto={
        "report":uwu,
        "usuariosA":usuariosA  
    }
    

    return redirect("VistaComentarios")

def AdvertenciaComentario(request,id):
    
    response = requests.post( apiUrl + "/modificar/advertirComentario/" + id,json={'id': id})
    
    Reportes=reportes.find({"estado": "activo"})
   
    uwu=[]
    
    ruts=[]
    usuariosA =[] 
    for reporte in Reportes:
        reporte["_id"] = str(reporte["_id"]); reporte["id"] = str(reporte["_id"])
        uwu.append(reporte)
        if not reporte['rut'] in ruts:  
            ruts.append(reporte['rut'])
            usuariosA.append(usuarios.find_one({'rut':reporte['rut']}))
            
    contexto={
        "report":uwu,
        "usuariosA":usuariosA  
    }

    return redirect("VistaComentarios")












#Usuario
def Registro(request):
    return render(request,"aplicacion/RegistrarU.html")

def ListaUsu(request):

    Usuarios = usuarios.find({"rol":"1"})
    
    contexto = {
        "usuarios": Usuarios,
    }

    return render(request, "aplicacion/ListaUsu.html", contexto)

def ModificarU(request,id):

    Usuarios = usuarios.find_one({"codigo": id})
    
    contexto = {
        "usuarios": Usuarios
    }

    return render(request,"aplicacion/ModificarU.html", contexto)

def ActivarPagos(request):

    response = requests.put( apiUrl + "/modificar/activarPagos" ) 
    

    return redirect("ListaUsu")











#Ejercicios
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
    listaMusc = musculos.find({})
    listaMaquina = maquinas.find({})
    
    uwu=[]
    
    for x in listaEje:
        x["foto"] = apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)


    contexto = {
        "listaEje": uwu,
        "listaMusc":listaMusc,
        "listaMaquina":listaMaquina
    }


    return render(request,"aplicacion/ListaEje.html",contexto)

def ModificarEjer(request, id):

    response = requests.post( apiUrl + "/modificar/buscarEjercicio/" + id) 

    Muscu = musculos.find({})
    Maquina = maquinas.find({})

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ owo["respuesta"][0]["foto"]
    owo["respuesta"][0]["video"] =  apiUrl+'/creacion/videos/'+ owo["respuesta"][0]["video"]

    
    contexto = {
        "modificarE": owo["respuesta"][0],
        "musculo" : Muscu,
        "maquina" : Maquina
    }

    return render(request,"aplicacion/ModificarEje.html",contexto)

def activarEjercicios(request,id):

    response = requests.post( apiUrl + "/modificar/activarEjercicio/" + id) 

    listaEje = ejercicios.find({})
    listaMusc = musculos.find({})
    listaMaquina = maquinas.find({})
    
    uwu=[]
    
    for x in listaEje:
        x["foto"] = apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)


    contexto = {
        "listaEje": uwu,
        "listaMusc":listaMusc,
        "listaMaquina":listaMaquina
    }

    return redirect("ListaEje")

def desactivarEjercicios(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarEjercicio/" + id) 

    listaEje = ejercicios.find({})
    listaMusc = musculos.find({})
    listaMaquina = maquinas.find({})
    
    uwu=[]
    
    for x in listaEje:
        x["foto"] = apiUrl+'/creacion/imagenes/MiniaturaEjercicios/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)


    contexto = {
        "listaEje": uwu,
        "listaMusc":listaMusc,
        "listaMaquina":listaMaquina
    }

    return redirect("ListaEje")










#Musculos
def CrearMusculos(request):
    return render(request,"aplicacion/CrearMusculos.html")

def ListaMusculos(request):

    Musculos = musculos.find({})

    uwu=[]

    for x in Musculos:
        x["foto"] = apiUrl+'/creacion/imagenes/fotosMusculos/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
    
    contexto = {
        "Musculos": uwu,
    }

    return render(request,"aplicacion/ListaMusculos.html",contexto)

def ModificarMusculos(request,id):

    response = requests.post(apiUrl + "/modificar/buscarMusculos/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/fotosMusculos/'+ owo["respuesta"][0]["foto"]
    

    contexto = {
        "modificarMusculos": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarMusculos.html",contexto)

def activarMusculos(request,id):

    response = requests.post( apiUrl + "/modificar/activarMusculo/" + id) 

    Musculos = musculos.find({})

    uwu=[]

    for x in Musculos:
        x["foto"] = apiUrl+'/creacion/imagenes/fotosMusculos/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
    
    contexto = {
        "Musculos": uwu,
    }

    return redirect("ListaMusculos")

def desactivarMusculos(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarMusculo/" + id) 

    Musculos = musculos.find({})

    uwu=[]

    for x in Musculos:
        x["foto"] = apiUrl+'/creacion/imagenes/fotosMusculos/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
    
    contexto = {
        "Musculos": uwu,
    }

    return redirect("ListaMusculos")










#Maquinas
def CrearMaquinas(request):
    return render(request,"aplicacion/CrearMaquinas.html")

def ListaMaquinas(request):

    Maquinas = maquinas.find({})

    owo=[]

    for x in Maquinas:
        x["foto"] = apiUrl+'/creacion/imagenes/fotoMaquinas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        owo.append(x)

    contexto = {
        "Maquinas": owo,
    }

    return render(request,"aplicacion/ListaMaquinas.html",contexto)

def ModificarMaquinas(request,id):

    response = requests.post(apiUrl + "/modificar/buscarMaquinas/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/fotoMaquinas/'+ owo["respuesta"][0]["foto"]

    contexto = {
        "modificarMaquinas": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarMaquinas.html",contexto)

def activarMaquinas(request,id):

    response = requests.post( apiUrl + "/modificar/activarMaquinas/" + id) 

    Maquinas = maquinas.find({})

    owo=[]

    for x in Maquinas:
        x["foto"] = apiUrl+'/creacion/imagenes/fotoMaquinas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        owo.append(x)

    contexto = {
        "Maquinas": owo,
    }

    return redirect("ListaMaquinas")

def desactivarMaquinas(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarMaquinas/" + id) 

    Maquinas = maquinas.find({})

    owo=[]

    for x in Maquinas:
        x["foto"] = apiUrl+'/creacion/imagenes/fotoMaquinas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        owo.append(x)

    contexto = {
        "Maquinas": owo,
    }

    return redirect("ListaMaquinas")










#Dietas
def CrearDie(request):

    tipoDieta = tipoDietas.find({})

    contexto = {
        "Tipos":tipoDieta
    }

    return render(request,"aplicacion/CrearDie.html",contexto)

def ListaDie(request):

    
    listaD = dietas.find({})
    listaTipoD = tipoDietas.find({})

    uwu=[]
    
    for x in listaD:
        x["foto"] = apiUrl+'/creacion/imagenes/Dietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)   
    
    contexto = {
        "listaD": uwu,
        "listaTipoD":listaTipoD
    }

    return render(request,"aplicacion/ListaDie.html",contexto)

def ModificarDie(request, id):

    
    tipoDieta = tipoDietas.find({})

    response = requests.post( apiUrl + "/modificar/buscarDietas/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/Dietas/'+ owo["respuesta"][0]["foto"]
    

    
    contexto = {
        "modificarD": owo["respuesta"][0],
        "Tipos":tipoDieta
    }

    return render(request,"aplicacion/ModificarDie.html",contexto)

def activarDietas(request,id):

    response = requests.post( apiUrl + "/modificar/activarDieta/" + id) 

    listaD = dietas.find({})
    listaTipoD = tipoDietas.find({})

    uwu=[]
    
    for x in listaD:
        x["foto"] = apiUrl+'/creacion/imagenes/Dietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)   
    
    contexto = {
        "listaD": uwu,
        "listaTipoD":listaTipoD
    }

    return redirect("ListaDie")

def desactivarDietas(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarDieta/" + id) 

    listaD = dietas.find({})
    listaTipoD = tipoDietas.find({})

    uwu=[]
    
    for x in listaD:
        x["foto"] = apiUrl+'/creacion/imagenes/Dietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)   
    
    contexto = {
        "listaD": uwu,
        "listaTipoD":listaTipoD
    }

    return redirect("ListaDie")










#Tipos de Dietas
def CrearTiposDietas(request):
    return render(request,"aplicacion/CrearTiposDietas.html")

def ListaTipoDietas(request):

    tipodietas = tipoDietas.find({})
    
    hola=[]

    for x in tipodietas:
        x["foto"] = apiUrl+'/creacion/imagenes/TipoDietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        hola.append(x)
    
    contexto = {
        "tipoD": hola,
    }

    return render(request,"aplicacion/ListaTipoDietas.html",contexto)



def ModificarTipoD(request,id):

    response = requests.post(apiUrl + "/modificar/buscarTipoDietas/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/TipoDietas/'+ owo["respuesta"][0]["foto"]
    
    contexto = {
        "modificarTipoD": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarTipoD.html",contexto)

def activarTipoD(request,id):

    response = requests.post( apiUrl + "/modificar/activarTipoD/" + id) 

    tipodietas = tipoDietas.find({})
    
    hola=[]

    for x in tipodietas:
        x["foto"] = apiUrl+'/creacion/imagenes/TipoDietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        hola.append(x)
    
    contexto = {
        "tipoD": hola,
    }

    return redirect("ListaTipoDietas")

def desactivarTipoD(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarTipoD/" + id) 

    tipodietas = tipoDietas.find({})
    
    hola=[]

    for x in tipodietas:
        x["foto"] = apiUrl+'/creacion/imagenes/TipoDietas/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        hola.append(x)
    
    contexto = {
        "tipoD": hola,
    }

    return redirect("ListaTipoDietas")










#Noticias
def CrearNot(request):
    return render(request,"aplicacion/CrearNot.html")

def ListaNot(request):

    listaN = noticia.find({})

    uwu=[]

    for x in listaN:
        x["foto"] = apiUrl+'/creacion/imagenes/FotosNoticia/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)
        
    
    contexto = {
        "listaN": uwu
    }

    return render(request,"aplicacion/ListaNot.html",contexto)

def desactivarNoticias(request,id):

    response = requests.post( apiUrl + "/modificar/desactivarNoticia/" + id) 

    listaN = noticia.find({})

    uwu=[]

    for x in listaN:
        x["foto"] = apiUrl+'/creacion/imagenes/FotosNoticia/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)


    contexto={
        "listaN": uwu
    }

    return redirect("ListaNot")
    

def activarNoticias(request,id):

    response = requests.post( apiUrl + "/modificar/activarNoticia/" + id) 

    listaN = noticia.find({})

    uwu=[]

    for x in listaN:
        x["foto"] = apiUrl+'/creacion/imagenes/FotosNoticia/'+ x["foto"]
        x["_id"] = str(x["_id"]); x["id"] = str(x["_id"])
        uwu.append(x)


    contexto={
        "listaN": uwu
    }

    return redirect("ListaNot")


def ModificarNot(request, id):

    response = requests.post(apiUrl + "/modificar/buscarNoticia/" + id) 

    owo= response.json()
    

    owo["respuesta"][0]["id"] = owo["respuesta"][0]["_id"]
    owo["respuesta"][0]["foto"] =  apiUrl+'/creacion/imagenes/FotosNoticia/'+ owo["respuesta"][0]["foto"]
    owo["respuesta"][0]["video"] =  apiUrl+'/creacion/videos/'+ owo["respuesta"][0]["video"]
    
    contexto = {
        "modificarN": owo["respuesta"][0]
    }

    return render(request,"aplicacion/ModificarNot.html",contexto)










#No se utilizara Pero por seacaso
def Reportes(request):
    return render(request,"aplicacion/Reportes.html")

@login_required (login_url= 'login' )
def ListaCategorias(request):
    return render(request,"aplicacion/ListaCategorias.html")