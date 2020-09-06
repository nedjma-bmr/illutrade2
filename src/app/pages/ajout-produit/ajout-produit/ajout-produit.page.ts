import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonInput } from '@ionic/angular';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { ProduitsService } from 'src/app/services/produits/produits.service';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { produit } from 'src/app/models/produit.model';
import { commande } from 'src/app/models/commande.model';
import { IonicSelectableComponent } from 'ionic-selectable';

import { famille } from 'src/app/models/famille.model';
import { FamilleService } from 'src/app/services/familles/famille.service';
import { StockService } from 'src/app/services/stock/stock';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.page.html',
  styleUrls: ['./ajout-produit.page.scss'],
})
export class AjoutProduitPage implements OnInit {
  
  @Input() public num:number;
  @ViewChild('remise') remiseElement: IonInput;
  qteProduit = 1;
  
  checked=false ; 
  remise   ; 
   
  commandesproduits: CommandProduits[];
  produitModel = new produit();
  produitModel1 = new produit();
  produitCmd = new produit();
  
  produits: produit[];
   familles: famille[];
  command_produit = new CommandProduits();
  displayProduit: produit[];
  familleModel= new famille();
  commandesproduits1 : CommandProduits[]=[];
  produitParFamille : produit[]=[];
  produitParFamille2 : produit[]=[];
  @ViewChild("selectComponent") selectComponent: IonicSelectableComponent;
  newCmdProduit= new CommandProduits();  

  constructor(
    private modalCrtl: ModalController,
    private cmdprodservice: CommandesProduitsService,
    private prodservice : ProduitsService,
    private servicefam : FamilleService,
    private alertctrl : AlertController,
    private stockSer:StockService,
  ) { }

  ngOnInit() {
    // récupérer la liste des familles 
    this.servicefam.getAll().subscribe((fam)=>{
       this.familles = fam ;
    });

    // récupérer la liste des commandes produits
    this.cmdprodservice.getAll().subscribe((prod_Cmd)=>{
      this.commandesproduits = prod_Cmd;
    });

// récupérer la liste des produits
    this.prodservice.getAll().subscribe((produit)=> {
      this.produits = produit;
      this.displayProduit = produit ;
    });
  }

  // récuperer la valeur de ionis-selectable quand celui-là change
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.produitCmd = event.value
        
  this.newCmdProduit.TVA = ( (this.produitCmd.TVA / 100 )) * (this.produitCmd.pvht)  
  this.newCmdProduit.TVA = Number (this.newCmdProduit.TVA.toFixed(2))
  this.newCmdProduit.prixttc= Number (this.produitCmd.pvht) + Number (this.newCmdProduit.TVA)
  this.newCmdProduit.puht = this.newCmdProduit.prixttc;
    
    
  }
  
  // récuperer la valeur de ionis-selectable quand celui-là change
  portChange2(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.familleModel = event.value;
    
      this.produitParFamille = this.prodservice.get2(this.familleModel.code_fam);
      /*
for(let i=0;i<this.produitParFamille.length;i++){
  this.stockSer.get(this.produitParFamille[i].id_prod).subscribe((prodS)=>{
    console.log(prodS);
    if(prodS.qte_prod === 0){
      this.produitParFamille.splice(i,1);
      this.produitParFamille2 = this.produitParFamille;
      console.log(this.produitParFamille2);
    }
  })
}
 */ 
  }

  increase(){
  
  
    this.qteProduit++;
   
   
    this.newCmdProduit.puht = this.newCmdProduit.prixttc * this.qteProduit;
  
  }

   /**
   * enregistrere les produits ajoutés 
   */
  async Register(){
      
      
    if(this.produitCmd.id_prod == undefined) {
      let alert = this.alertctrl.create({
        
        message: 'Veuillez d abord choisir un produit',
        buttons: ['Annuler', 'OK']
      });

      (await alert).present();
    } else {
    
    this.newCmdProduit.TVA = this.produitCmd.TVA
    this.newCmdProduit.id_produit = this.produitCmd.id_prod;
    this.newCmdProduit.design_prod = this.produitCmd.design_prod;
    this.newCmdProduit.code_prod = this.produitCmd.code_prod;
    this.newCmdProduit.qte = this.qteProduit;
    this.newCmdProduit.pvht = this.produitCmd.pvht
    this.qteProduit = 1;
   
    if (!this.checked ){
      this.newCmdProduit.remise= 0
    }
    
    

     this.modalCrtl.dismiss(this.newCmdProduit);
     console.log(this.newCmdProduit)
     
    
  }
    
    
    }
    /*
  valider(){
    
    this.command_produit= new  CommandProduits() ;
    this.command_produit.id_produit = this.produitCmd.id_prod ;
    this.command_produit.Num_cmd = this.num ;
    this.command_produit.qte = this.qte;
    this.command_produit.puht = this.produitCmd.pvht ;
    this.command_produit.remise = this.remise ;
    
       this.commandesproduits1.push(this.command_produit);
        return this.commandesproduits1 ;
  }
*/
  decrease(){


    this.qteProduit--;
   
    this.newCmdProduit.puht = this.newCmdProduit.prixttc * this.qteProduit;
  
  }
   /*mettre le focus sur le champ de saisie de remise*/
   remiseFocus(){
    this.remiseElement.setFocus();
  }
  submitForm() {
    this.modalCrtl.dismiss(this.commandesproduits1).then(()=>{
      
      console.log("fin de la selection des produits !");
    }
    ) ;
    this.dismissModal();
    }
  


  filterList(evt:any) {
   
     
 }
 dismissModal(){
  this.modalCrtl.dismiss('fermé');
}    
}
