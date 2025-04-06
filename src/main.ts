import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModuleWithProviders } from '@angular/core';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()), provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
    positionClass: 'toast-bottom-right',
    timeOut: 3000
  })) ],
}).catch((err) => console.error(err));


