import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection , importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
     provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
     provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
   
    
  ]
};
