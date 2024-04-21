from django.shortcuts import render

# Create your views here.
def pantalla(request):
    return render(request,"aplicacion/inicio.html")

def login(request):
    return render(request,"aplicacion/login.html")




def Solicitudes(request):
    return render(request,"aplicacion/Solicitudes.html")

def Informes(request):
    return render(request,"aplicacion/Informes.html")




def Registro(request):
    return render(request,"aplicacion/RegistrarU.html")

def ListaUsu(request):
    return render(request,"aplicacion/ListaUsu.html")

def ModificarU(request):
    return render(request,"aplicacion/ModificarU.html")




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
