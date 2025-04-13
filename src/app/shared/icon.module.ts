import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, Calendar, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin, Pencil } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Building2, Calendar, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin, Pencil })],
  exports: [LucideAngularModule],
})
export class IconModule {}