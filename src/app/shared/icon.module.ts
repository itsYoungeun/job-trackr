import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BriefcaseBusiness, Building2, Calendar, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ BriefcaseBusiness, Building2, Calendar, CircleUser, Funnel, HandCoins, LayoutGrid, List, MapPin })],
  exports: [LucideAngularModule],
})
export class IconModule {}