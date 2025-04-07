import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, Calendar, HandCoins, MapPin } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Building2, Calendar, HandCoins, MapPin })],
  exports: [LucideAngularModule],
})
export class IconModule {}