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

def ModificarU(request):
    return render(request,"aplicacion/ModificarU.html")

def CrearEjer(request):
    return render(request,"aplicacion/CrearEje.html")

def ModificarEjer(request):
    return render(request,"aplicacion/ModificarEje.html")

def CrearDie(request):
    return render(request,"aplicacion/CrearDie.html")

def ModificarDie(request):
    return render(request,"aplicacion/ModificarDie.html")
