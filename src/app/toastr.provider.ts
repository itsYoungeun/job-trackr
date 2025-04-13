import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export function provideToastr() {
  return [
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        tapToDismiss: true,
        newestOnTop: true,
        easeTime: 300,
        toastClass: 'ngx-toastr custom-toast'
      })
    )
  ]
}