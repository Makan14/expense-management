// je précise que cst 1 composant client
"use client"

import { useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";
import { Activity, ArrowDownCircle, ArrowUpCircle, PlusCircle, Trash, TrendingDown, TrendingUp, Wallet } from "lucide-react"

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

  // je cree 1 fonction deleteTransactions 
  // dns async je met l id de l element a supp
  const deleteTransactions = async(id : string)=>{
    try{
      
      await api.delete(`transactions/${id}/`)   
      // je recup la fonction qui appel ls transaction
      getTransactions()
     
      toast.success("Transactions supprimée avec succès") 

    }catch (error){
      console.error("Erreur suppression transactions", error); 
      toast.error("Erreur suppression transactions");
    }
  }
    useEffect(() => {
      getTransactions()
    }, []);

    // 1 const amounts qui contient tte ls transactions, il va itéré sur le tableau et sur chaqsue transaction (t) ensuite il va convertir en number le champ amount de chaque transaction
    const amounts = transactions.map((t) =>Number(t.amount) || 0)  

    // reduce pr faire des calculs rapidement , il cree 1 variable acc et il recup 1 item (amounts le montant dns ls transactions) puis il additionne acc et item et met par defaut acc à 0 et si amounts n a pas été calculé il met a 0
    const balance = amounts.reduce((acc, item) => acc + item, 0) || 0 

    // je calcul les revenus
    const income = amounts.filter((a) => a > 0).reduce((acc, item) => acc + item, 0) || 0
    // je calcul ls dépenses
    const expense = amounts.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) || 0

    // je verif si income est sup a 0 si oui je fais math.min je divise expense par ls incomes le tt * 100 et par defaut si il n arrive pas a faire le calcul que ts soit egal à 0
    const ratio = income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0  

    // 1 fnction qui permet de formater ls dates en FR
    const formatDate = (dateString: string) => {
      const d = new Date(dateString);
      return d.toLocaleDateString("fr-FR", {
        year : "numeric",
        month : "short",
        day : "numeric",
        hour : "2-digit",
        minute : "2-digit",
      });
    };  

    
  return (
    <div className="w-2/3 flex flex-col gap-4">
      <div className="flex justify-between rounded-2x1 border-2 border-warning/10 border-dashed bg-warning/5 p-5">

        <div className="flex flex-col gap-1">
            <div className="badge badge-soft">
              <Wallet className="w-4 h4"/>
              Votre Solde
            </div>
      
          <div className="stat-value">
            {/* je met balance (le montant) et tofixed pr fixer le nombre de chiffre apres la virgule */}
            {balance.toFixed(2)} €
          </div>

        </div>

        <div className="flex flex-col gap-1">
            <div className="badge badge-soft badge-success">
              <ArrowUpCircle className="w-4 h4"/>
              Revenus
            </div>
      
          <div className="stat-value">
            {/* je met balance (le montant) et tofixed pr fixer le nombre de chiffre apres la virgule */}
            {income.toFixed(2)} €
          </div>

        </div>
        <div className="flex flex-col gap-1">
            <div className="badge badge-soft badge-error">
              <ArrowDownCircle className="w-4 h4"/>
              Dépenses
            </div>
      
          <div className="stat-value">
            {/* je met balance (le montant) et tofixed pr fixer le nombre de chiffre apres la virgule */}
            {expense.toFixed(2)} €
          </div>

        </div>
        

      </div>

      <div className="rounded-2x1 border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex justify-between items-center mb-1">
        
            <div className="badge badge-soft badge-warning gap-1">
              <Activity className="w-4 h-4"/>
              Dépenses vs Revenus
            </div>
            {/* je fixe le ratio à 0 */}
            <div>{ratio.toFixed(0)}%</div>           
        </div>
        
        {/* barre de progression */} 
        <progress className="progress progress-warning w-full" value={ratio} max={100}> 
              
        </progress>
      </div>

      {/* button */}
      {/*pr add 1 ligne dns mn tableau */}
      <button className="btn btn-warning" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
        <PlusCircle className="w-4 h-4"/> 
        Ajouter une transaction
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

    {/* TABLEAU */}
  <div className="overflow-x-auto rounded-2x1 border-2 border-warning/10 border-dashed bg-warning/5">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Montant</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

      {/* je vais itérer transaction sur chaque element */} 
      {transactions.map((t, index) => ( 
        <tr key = {t.id}>
          <th>{index + 1}</th>
          <td>{t.text}</td>
          <td className="font-semibold flex items-center gap-2">
            {t.amount > 0 ? (<TrendingUp className="text-success w-6 h-6"/>) : (<TrendingDown className="text-warnning w-6 h-6"/>)}
            {t.amount > 0 ? `+${t.amount}` : `-${t.amount}`}
          </td>
          <td>{formatDate(t.created_at)}</td>
          <td>
            <button onClick={() => deleteTransactions(t.id)} className="btn btn-sm btn-error btn-soft" title="Supprimer">
              <Trash className="w-4 h-4"/>
            </button>
          </td>
        </tr>

      ))}

      
     
    </tbody>
  </table>
</div>
    </div>
      
  );
}
