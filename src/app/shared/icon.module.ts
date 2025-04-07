import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, Calendar, HandCoins } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Building2, Calendar, HandCoins })],
  exports: [LucideAngularModule],
})
export class IconModule {}