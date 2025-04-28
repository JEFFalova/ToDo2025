import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular'
import { importProvidersFrom} from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { IonicModule } from '@ionic/angular';




bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(IonicStorageModule.forRoot(), HttpClientModule, IonicModule.forRoot()), 
   
  ],
});

