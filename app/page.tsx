// je précise que cst 1 composant client
"use client"

import { useState } from "react";
import api from "./api";

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
    }catch (error){

    }
  }

  return (
      <button className="btn btn-sm">
        test
      </button>
  );
}
