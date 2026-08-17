from django.db import models
# j importe uuid
import uuid


# la class Transaction va heriter de models en haut
class Transaction(models.Model):

    # j utilise 1 uuid qui est 1 serie de caractere
    # je vais dire que cst 1 cle primaire
    # je lui dit que ce champ n est pas modifiable avc editable
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 

    # chaque transaction sera suivi d1 test
    # je dit que c 1 champ de txt avc charfield avc 1 longeur maximal de 255 carctere (max lenght)
    text = models.CharField(max_length=255)

    # chaque transaction à un montant
    #  amount est 1 decimal
    # max_digits représente le nombre total maximal de chiffres
    # je veux 2 chiffre apres la virgule avc decimal_places
    amount = models.DecimalField(max_digits=10 , decimal_places=2)

    # date de creation de cette transaction avc datatimefield et auto now add qui va prendre la date a laquell l user a fait la transaction
    created_at = models.DateTimeField(auto_now_add=True)

    # je cree 1 class Meta qui va permetre de savoir dns kel ordre retourner la liste des transctions
    class Meta:
        ordering = ['-created_at']

    # je defini 1 fonction en mettant l instance self qui va retourner text et amount
    def __str__(self):
        return f"{self.text}" ({self.amount})


