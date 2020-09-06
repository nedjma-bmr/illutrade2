export class CommandProduits {
    id_prod : number ; 
    id_produit : number ; 
    Num_cmd : number ;
    design_prod : string ;
    qte : number ; 
    puht : number ; 
    remise : number ; 
    TVA : number ; 
    pvht: number; 
    image: string ; 
    prixttc : number ; 
code_prod :string
    // montant total d'un seul produit  
    total : number ; 
    // pour voir si la quantité est modifié 
    estModifie : boolean = false;
}