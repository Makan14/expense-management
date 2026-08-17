from django.shortcuts import render
# j importe generics
from rest_framework import generics
from .serializers import TransactionSerializer 

# depuis le fichier model.py importe moi Transaction
from .models import Transaction

# CRUD
# je cree 1 view qui liste et cree 1 transaction
# la class TransactionListCreateVie va heriter de ListCreateApiView qui est 1 class cree auto par rest framework
class TransactionListCreateView(generics.ListCreateAPIView): 

    # je lui dit "comment recup la liste ds objets transactions" avc queryset
    queryset = Transaction.objects.all()
    # je precise la classe de serialisation
    serializer_class = TransactionSerializer

class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    # je precise que cette classe doit recup l id de l element qu on veut traiter
    lookup_field = "id"



