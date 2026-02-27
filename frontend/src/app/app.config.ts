// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { PRIME_NG_CONFIG } from 'primeng/config';
import {
  provideTranslateService,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { routes } from './app.routes';
import { FR_TRANSLATIONS, EN_TRANSLATIONS } from './shared/i18n/translations';

// Loader inline — fonctionne en SSR, zéro requête HTTP, zéro délai
class InlineTranslateLoader implements TranslateLoader {
  private readonly translations: Record<string, any> = {
    fr: FR_TRANSLATIONS,
    en: EN_TRANSLATIONS,
  };

  getTranslation(lang: string): Observable<any> {
    return of(this.translations[lang] ?? FR_TRANSLATIONS);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: InlineTranslateLoader,
      },
      defaultLanguage: 'fr',
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      return translate.use('fr');
    }),
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
