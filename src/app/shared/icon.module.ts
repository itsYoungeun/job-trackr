import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, Calendar, HandCoins, LayoutGrid, List, MapPin } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Building2, Calendar, HandCoins, LayoutGrid, List, MapPin })],
  exports: [LucideAngularModule],
})
export class IconModule {}