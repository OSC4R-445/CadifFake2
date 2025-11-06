import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// *** 1. Importar la función defineCustomElements ***
import { defineCustomElements } from '@ionic/core/loader';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// *** 2. Llamar a defineCustomElements para cargar los iconos ***
// Esto inicializa el cargador de componentes de Ionic, incluyendo ion-icon.
defineCustomElements(window);


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});