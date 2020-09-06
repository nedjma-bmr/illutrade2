import { Component, OnInit, Input } from '@angular/core';
import { produit } from 'src/app/models/produit.model';
import { ModalController } from '@ionic/angular';
import { CommandProduits } from 'src/app/models/commande-produit.model';

@Component({
  selector: 'app-produits-command',
  templateUrl: './produits-command.page.html',
  styleUrls: ['./produits-command.page.scss'],
})
export class ProduitsCommandPage implements OnInit {
@Input() public produits:CommandProduits[];
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
