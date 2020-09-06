import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevisPageRoutingModule } from './devis-routing.module';

import { DevisPage } from './devis.page';


import { DetailDevisPage } from '../detail-devis/detail-devis.page';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevisPageRoutingModule
  ],
  declarations: [DevisPage, DetailDevisPage],
  entryComponents: [DetailDevisPage]
})
export class DevisPageModule {}
