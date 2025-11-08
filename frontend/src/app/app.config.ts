// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { PRIME_NG_CONFIG } from 'primeng/config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Temporairement commenté pour éviter les problèmes SSR
    // provideClientHydration(withEventReplay()),
    provideClientHydration(), // Version simple sans event replay
    provideHttpClient(withFetch()), // Provider pour HttpClient
    provideAnimations(), // Nécessaire pour les animations PrimeNG
    {
      provide: PRIME_NG_CONFIG,
      useValue: {
        ripple: true,
        inputStyle: 'outlined',
        theme: 'aura-light-blue',
      },
    },
  ],
};

// Alternative si providePrimeNG n'est pas disponible dans votre version :
// import { PrimeNGConfig } from 'primeng/api';
//
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideClientHydration(withEventReplay()),
//     provideAnimations(),
//     {
//       provide: PrimeNGConfig,
//       useFactory: () => {
//         const config = new PrimeNGConfig();
//         config.ripple = true;
//         return config;
//       }
//     }
//   ],
// };
