from django.shortcuts import render

# Create your views here.
def pantalla(request):
    return render(request,"aplicacion/inicio.html")
