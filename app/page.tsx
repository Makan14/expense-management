// je précise que cst 1 composant client
"use client"

import { useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";

// je crée 1 type qui represente chaque transaction 
type Transaction = {
  id : string;
  text : string;
  amount : number;
  // comme j utilise react framework du coup il va me renvoyer ds string ou ds number 
  created_at : string;

}

export default function Home() {
  // je cree 1 tableau de transaction
  // dns usestate je precise ce que le tableau transaction va contenir un tableau qui par default ne contient rien
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // je cree 1 fonction pr chargé 1 transaction
  // assync pr appelé 1 api
  const getTransactions = async()=>{
    // try et catch pr attraper 1 erreur quand il yen aura
    try{
      // j appel l api qui provint du fichier api.ts
      // get pr recup la transaction
      const res = await api.get<Transaction[]>("transactions/")

      // je recup le tableau const [transactions, setTransactions]
      setTransactions(res.data) 
      // j importe toast
      toast.success("Transactions chargées") 

    }catch (error){
      console.error("Erreur chargement transactions", error); 
      toast.error("Erreur chargement transactions");

    }
  }
    // j appel la fonction getTransactions aux chargement de la page
    useEffect(() => {
      getTransactions()
    }, []);

    // 1 const amounts qui contient tte ls transactions, il va itéré sur le tableau et sur chaqsue transaction (t) ensuite il va convertir en number le champ amount de chauqe transaction
    const amounts = transactions.map((t) =>Number(t.amount) || 0)  

    // reduce pr faire des calculs rapidement , il cree 1 variable acc et il recup 1 item (amounts le montant dns ls trasactions) puis il additionne acc et item et met par defaut acc à 0 et si amounts n a pas été calculé il met a 0
    const balance = amounts.reduce((acc, item) => acc + item, 0) || 0
    
  return (
      <button className="btn btn-sm">
        test
      </button>
  );
}
