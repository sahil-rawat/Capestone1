from django.shortcuts import render
from django.http import HttpResponse
from .models import project,orange,red,blue


def homePageView(request):
    context = {
        'orange': orange,
        'red':red,
        'blue':blue
    }
    return render(request, 'index.htm', context)
