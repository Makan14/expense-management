# serializer permet de transformer 1 objet en txt (JSON) pr ls appel d API

# la class doit heriter du serializer
from rest_framework import serializers
# j importe le fichier models.py pr Transaction (du fichier models.py importe moi Transaction)
from .models import Transaction

# je cree 1 class transaction
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        # je met les champs qui seront dns le json
        fields = ["id", "text", "amount", "created_at"]
        # qund je veux crée 1 nvll transaction l user n'aura le droit ne ns envoyer 2 infos (text et amount)
        # ls champs qui ne touchera pas son id et created_at
        read_only_fields = ["id", "created_at"] 