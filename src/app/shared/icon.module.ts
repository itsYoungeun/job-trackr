import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, Calendar, Camera, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin, Pencil, Trash2 } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Building2, Calendar, Camera, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin, Pencil, Trash2 })],
  exports: [LucideAngularModule],
})
export class IconModule {}