// je précise que cst 1 composant client
"use client"

import { useState } from "react";

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
  // dns usestate je precise ce que le tableau transaction va contenir la un tableau
  const [transactions, setTransactions] = useState<Transaction[]>([])
  return (
      <button className="btn btn-sm">
        test
      </button>
  );
}
