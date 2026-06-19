import { Routes } from '@angular/router';
import { Consumers } from './consumers/consumers';
import { Products } from './products/products';
import { Orders } from './orders/orders';

export const routes: Routes = [
  {path: 'consumers', component: Consumers},
  {path: 'products', component: Products},
  {path:'orders', component: Orders}
];
