# api/urls.py
from django.contrib import admin
from django.urls import path
# j importe view
from .import views

urlpatterns = [
    # je defini mes api
    # as view pr dire que c 1 view
    path('transactions/',views.TransactionListCreateView.as_view()),

    #  je def l url pr appeler l api TransactionRetrieveUpdateDestroyView
    # je met l id de l elemnt que je veux uuid:id (:id en argument)
    path('transactions/<uuid:id>/',views.TransactionRetrieveUpdateDestroyView.as_view()) 
]
