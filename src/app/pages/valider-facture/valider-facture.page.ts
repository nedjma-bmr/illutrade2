import { Component, OnInit, Input } from '@angular/core';
import { LivraisonProduits } from 'src/app/models/livraison-produits.model';
import { ModalController, ToastController } from '@ionic/angular';
import { FacturesService } from 'src/app/services/factures/factures.service';
import { FactureProduitsService } from 'src/app/services/facture-produits/facture-produits.service';
import { Facture } from 'src/app/models/facture.model';
import { FactureProduits } from 'src/app/models/facture-produits.model';
import { LivraisonsService } from 'src/app/services/livraisons/livraisons.service';
import { Livraison } from 'src/app/models/livraison.model';

@Component({
  selector: 'app-valider-facture',
  templateUrl: './valider-facture.page.html',
  styleUrls: ['./valider-facture.page.scss'],
})
export class ValiderFacturePage implements OnInit {

@Input () livraisonProduits: LivraisonProduits [] ; 
@Input () factureModel: Facture 
@Input () BonLivID = []; 
@Input () BonLivList : Livraison []
livraisonModel = new Livraison ()
livraison : Livraison [];
ProduitsFacturer : FactureProduits [] = []
  constructor( private modalCtrl : ModalController, 
    private _factureService : FacturesService,
    private _factureProduitsService : FactureProduitsService, 
    public toast: ToastController , 
    private _livraisonService : LivraisonsService) { }

  ngOnInit() {
  
    this._livraisonService.getAll().subscribe(data=>{
      this.livraison=data;
    })
 
    this.livraisonProduits.forEach(prod=>{
      
      prod.prixttc = Number(prod.pvht) + (Number(prod.pvht) * (Number(prod.TVA)/100));
      prod.prixttc = Number (prod.prixttc.toFixed(2))
      prod.puht = Number((prod.prixttc * prod.qte).toFixed(2)); 
     prod.total = Number (prod.puht) * (1- (Number (prod.remise/100)));
     prod.total = Number (prod.total.toFixed(2));
     
     const prodFact = new FactureProduits() 
      
     prodFact.id_prod = prod.id_prod;
     prodFact.puht = prod.puht;
     prodFact.qte = prod.qte ; 
     prodFact.remise = prod.remise
   
    this.ProduitsFacturer.push(prodFact)

  
   
     
     
    })
    

  }
/**
 * enregistrement de la facture et les produits importées dans la bdd 
 */
ValiderBonLivraison(){

 this._factureService.create(this.factureModel).subscribe(async idFacture=>{
   
  this.ProduitsFacturer.forEach(prodFactrer=>{
    prodFactrer.id_Fact= idFacture.toString() ;

})



   this._factureProduitsService.add(this.ProduitsFacturer ).subscribe()
      

     this.toast.create({
      message: 'Bon de livraison créé avc succés',
      duration: 2000
      }).then((toastData) => {
 
       toastData.present();


this.BonLivList.forEach(bonLiv=>{
  this.livraisonModel= bonLiv
  this.livraisonModel.estValider= 1
 
  this._livraisonService.update(this.livraisonModel,bonLiv.id_bonLiv).subscribe(data=>{
    this.modalCtrl.dismiss(this.factureModel)
  })
  
})
});

});
}
  /**
     * fermer la page 
     */
    dismissModal(){
      this.modalCtrl.dismiss('close'); 
    
    }
}
