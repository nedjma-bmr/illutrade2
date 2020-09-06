import { Component, OnInit, Input } from "@angular/core";
import { DevisService } from "src/app/services/devis/devis.service";
import { Devis } from "src/app/models/devis.model";
import { DevisProduits } from "src/app/models/devis-produits.model";
import { ModalController, NavController } from "@ionic/angular";
import { DevisProduitsService } from "src/app/services/devis-produits/devis-produits.service";
import { produit } from 'src/app/models/produit.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CommandesService } from 'src/app/services/commandes/commandes.service';
import { commande } from 'src/app/models/commande.model';
import { CommandProduits } from 'src/app/models/commande-produit.model';
import { CommandesProduitsService } from 'src/app/services/commandes_produits/commandes-produits.service';
import { Router } from '@angular/router';
import { ProduitsImporterPage } from '../produits-importer/produits-importer.page';
@Component({
  selector: "app-importer-devis",
  templateUrl: "./importer-devis.page.html",
  styleUrls: ["./importer-devis.page.scss"],
})
export class ImporterDevisPage implements OnInit {
  devisImporter: Devis[];
  devisProduitsImporter: DevisProduits[]=[];
  deviscmd=new Devis();
  devislist : Devis[]=[];
  devis:Devis ;
  @Input() idClientDevisImporter: string;
  @Input() num:number;
  today=new Date();
  cmd = new commande();

  constructor(
    private devisSER: DevisService,
    private modalCrtl: ModalController,
    private _devisProduits: DevisProduitsService,
    private cmdSer : CommandesService ,
    private cmdProdSer : CommandesProduitsService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.devisSER.getAll().subscribe(devis=>{
       this.devislist = devis ;
    });
    /**
     * recuperation  de la liste des devis du client choisit
     */
    this.devisSER
      .getListDevisByClientId(this.idClientDevisImporter)
      .subscribe((ListDevis) => {
        this.devisImporter = ListDevis;
        console.log(this.devisImporter);
      });
  }
  /**
   * Récupération de la liste des produits du devis choisit
   */
  SelectionDevisImporter(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    
    this.devis = event.value
      this.modalCrtl
        .create({
          component: ProduitsImporterPage,
          componentProps: { 'idDevisImporter': this.devis.id_proforma,'num':this.num,'idClientDevisImporter':this.idClientDevisImporter},
          swipeToClose: true,
        })
        .then((modal) => {
          modal.present();
          return modal.onDidDismiss();
        })
        .then(({ data, role }) => {
          if (role === "created") {
          }
          this.modalCrtl.dismiss(); 
        });
    }
    
  
  

dismiss(){
  this.modalCrtl.dismiss();
}
 
 // fermer la modal
 closeModal() {
  this.modalCrtl.dismiss(null, "fermé");
}
  
}
