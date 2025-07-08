import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, throwError, timer } from 'rxjs';
import { map, catchError, timeout, retry } from 'rxjs/operators';

// Import EmailJS avec compatibilité Angular 19
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  // Angular 19 - Injection moderne
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly TARGET_EMAIL = 'jovanylemoupa@gmail.com';
  private readonly isBrowser: boolean;

  // 🔑 VOS CLÉS EMAILJS RÉELLES
  private readonly EMAILJS_CONFIG = {
    PUBLIC_KEY: '8lBlzgleZ0pi8NgWj',
    SERVICE_ID: 'service_p0malk2',
    TEMPLATE_ID: 'template_htn3nve', // ✅ Votre vrai Template ID !
  };

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // 🚀 Initialisation EmailJS sécurisée Angular 19
    if (this.isBrowser && typeof window !== 'undefined') {
      this.initializeEmailJS();
    }
  }

  /**
   * 🔧 Initialisation EmailJS moderne
   */
  private async initializeEmailJS(): Promise<void> {
    try {
      await emailjs.init({
        publicKey: this.EMAILJS_CONFIG.PUBLIC_KEY,
        blockHeadless: true, // Protection Angular 19
        limitRate: {
          id: 'app_limit',
          throttle: 10000, // 10 secondes entre envois
        },
      });

      console.log('🎉 EmailJS initialisé avec Angular 19 !');
      console.log('🔑 Public Key:', this.EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('🎯 Service ID:', this.EMAILJS_CONFIG.SERVICE_ID);
      console.log('📝 Template ID:', this.EMAILJS_CONFIG.TEMPLATE_ID);
    } catch (error) {
      console.error('❌ Échec initialisation EmailJS:', error);
    }
  }

  /**
   * 🎯 MÉTHODE PRINCIPALE - Angular 19 + EmailJS
   */
  sendMail(mailInfo: string): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('Service côté serveur uniquement'));
    }

    const data = JSON.parse(mailInfo);
    const deviceInfo = this.detectDevice();

    console.log(`📧 [${deviceInfo.type}] Envoi EmailJS Angular 19...`);
    console.log('📋 Données:', data);

    return this.sendViaEmailJS(data).pipe(
      retry({ count: 2, delay: 3000 }), // Angular 19 retry amélioré
      catchError((error) => {
        console.error('❌ EmailJS final échec:', error);
        return this.emergencyBackup(data);
      })
    );
  }

  /**
   * 🥇 EmailJS - Méthode Angular 19 optimisée
   */
  private sendViaEmailJS(data: any): Observable<any> {
    const templateParams = {
      from_name: data.name || 'Anonyme',
      from_email: data.email || 'email@inconnu.com',
      subject: data.subject || 'Message depuis portfolio',
      message: data.message || 'Message vide',
      device_info: this.detectDevice().type,
      timestamp: new Date().toLocaleString('fr-FR'),
      page_url: window.location.href,
      user_agent: navigator.userAgent.substring(0, 100),
      angular_version: '19', // Info debug
    };

    console.log('📤 Envoi EmailJS avec params:', templateParams);

    return from(
      emailjs.send(
        this.EMAILJS_CONFIG.SERVICE_ID,
        this.EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        {
          publicKey: this.EMAILJS_CONFIG.PUBLIC_KEY,
        }
      )
    ).pipe(
      timeout(20000), // 20 secondes Angular 19
      map((response: EmailJSResponseStatus) => {
        console.log('🎉 ✅ EmailJS SUCCÈS Angular 19 !', response);
        return {
          success: true,
          method: 'EmailJS',
          status: response.status,
          message: 'Email envoyé avec Angular 19 !',
          device: this.detectDevice().type,
          timestamp: new Date().toISOString(),
        };
      }),
      catchError((error: any) => {
        console.error('❌ Erreur EmailJS détaillée:', error);

        // Messages d'erreur spécifiques Angular 19
        let errorMessage = 'Erreur EmailJS inconnue';

        if (error?.message?.includes('template')) {
          errorMessage = `Template '${this.EMAILJS_CONFIG.TEMPLATE_ID}' introuvable !`;
        } else if (error?.message?.includes('service')) {
          errorMessage = `Service '${this.EMAILJS_CONFIG.SERVICE_ID}' invalide !`;
        } else if (error?.message?.includes('public')) {
          errorMessage = 'Clé publique invalide !';
        } else if (error?.status === 400) {
          errorMessage = 'Erreur de configuration EmailJS (400)';
        } else if (error?.name === 'TimeoutError') {
          errorMessage = 'Timeout EmailJS (20s dépassées)';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * 🆘 Sauvegarde d'urgence Angular 19
   */
  private emergencyBackup(data: any): Observable<any> {
    const deviceInfo = this.detectDevice();
    const timestamp = new Date().toISOString();

    const backupData = {
      ...data,
      device: deviceInfo,
      timestamp,
      angular_version: '19',
      url: window.location.href,
      method: 'Backup Angular 19',
    };

    // LocalStorage moderne Angular 19
    if (this.isBrowser && 'localStorage' in window) {
      try {
        const key = 'angular19_portfolio_emails';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(backupData);
        localStorage.setItem(key, JSON.stringify(existing));
        console.log('💾 Sauvegarde Angular 19 réussie');
      } catch (e) {
        console.warn('❌ localStorage indisponible:', e);
      }
    }

    // Console log pour debug
    console.group('🚨 BACKUP EMAIL ANGULAR 19');
    console.log('📧 Destinataire:', this.TARGET_EMAIL);
    console.log('👤 Expéditeur:', `${data.name} <${data.email}>`);
    console.log('📋 Sujet:', data.subject);
    console.log('💬 Message:', data.message);
    console.log('📱 Device:', deviceInfo.type);
    console.log('🕐 Timestamp:', timestamp);
    console.log('🌐 URL:', window.location.href);
    console.log('🔧 Angular:', '19');
    console.groupEnd();

    return of({
      success: true,
      method: 'LocalStorage Backup',
      message: 'Email sauvegardé localement (Angular 19)',
      device: deviceInfo.type,
      timestamp,
    });
  }

  /**
   * 📱 Détection device Angular 19
   */
  private detectDevice(): any {
    if (!this.isBrowser) {
      return { type: 'SSR', isMobile: false };
    }

    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|phone|tablet/.test(ua);
    const isIOS = /iphone|ipad/.test(ua);
    const isAndroid = /android/.test(ua);
    const isDesktop = !isMobile;

    return {
      type: isIOS
        ? 'iOS'
        : isAndroid
        ? 'Android'
        : isMobile
        ? 'Mobile'
        : 'Desktop',
      isMobile,
      isIOS,
      isAndroid,
      isDesktop,
      userAgent: ua.substring(0, 50),
    };
  }

  /**
   * 🔍 Test diagnostic Angular 19
   */
  testConnectivity(): Observable<any> {
    /**
    console.group('🔍 DIAGNOSTIC ANGULAR 19 + EMAILJS');
    console.log('🅰️ Angular Version:', '19');
    console.log('🌐 Browser Support:', this.isBrowser);
    console.log('📧 EmailJS Ready:', typeof emailjs !== 'undefined');
    console.log('🔑 Public Key:', this.EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('🎯 Service ID:', this.EMAILJS_CONFIG.SERVICE_ID);
    console.log('📝 Template ID:', this.EMAILJS_CONFIG.TEMPLATE_ID);
    console.log('📱 Device:', this.detectDevice());
    console.log('📧 Target Email:', this.TARGET_EMAIL);
    console.groupEnd(); **/

    return of({
      angular_version: '19',
      emailjs_loaded: typeof emailjs !== 'undefined',
      browser_support: this.isBrowser,
      config_valid: !!(
        this.EMAILJS_CONFIG.PUBLIC_KEY &&
        this.EMAILJS_CONFIG.SERVICE_ID &&
        this.EMAILJS_CONFIG.TEMPLATE_ID
      ),
      device: this.detectDevice(),
      target_email: this.TARGET_EMAIL,
      status: '🚀 Angular 19 + EmailJS configuré !',
    });
  }

  /**
   * 🧪 Mode test pour développement Angular 19
   */
  sendMailTest(mailInfo: string): Observable<any> {
    const data = JSON.parse(mailInfo);
    console.log('🧪 MODE TEST ANGULAR 19');
    console.log('📋 Test avec données:', data);
    console.log('📧 Email cible:', this.TARGET_EMAIL);
    console.log('🎯 Template ID:', this.EMAILJS_CONFIG.TEMPLATE_ID);

    return timer(1500).pipe(
      map(() => ({
        success: true,
        method: 'EmailJS Test Mode (Angular 19)',
        device: this.detectDevice().type,
        message: 'Test simulé réussi avec Angular 19 !',
        data: data,
        timestamp: new Date().toISOString(),
      }))
    );
  }

  /**
    🧪 Mode test pour développement Angular 19
   
  sendMailTest(mailInfo: string): Observable<any> {
    const data = JSON.parse(mailInfo);
    console.log('🧪 MODE TEST ANGULAR 19');
    console.log('📋 Test avec données:', data);
    console.log('📧 Email cible:', this.TARGET_EMAIL);
    console.log('🎯 Template ID:', this.EMAILJS_CONFIG.TEMPLATE_ID);

    return timer(1500).pipe(
      map(() => ({
        success: true,
        method: 'EmailJS Test Mode (Angular 19)',
        device: this.detectDevice().type,
        message: 'Test simulé réussi avec Angular 19 !',
        data: data,
        timestamp: new Date().toISOString(),
      }))
    );
  }

  /**

  /**
   * 🔄 Retry emails sauvegardés Angular 19
   */
  retryFailedEmails(): Observable<any[]> {
    if (!this.isBrowser || !('localStorage' in window)) {
      return of([]);
    }

    try {
      const key = 'angular19_portfolio_emails';
      const savedEmails = JSON.parse(localStorage.getItem(key) || '[]');

      if (savedEmails.length === 0) {
        console.log('📧 Aucun email Angular 19 à retry');
        return of([]);
      }

      console.log(`🔄 Retry ${savedEmails.length} emails Angular 19...`);

      // Retry du premier email
      const emailToRetry = savedEmails[0];

      return this.sendMail(JSON.stringify(emailToRetry)).pipe(
        map((result) => {
          if (result.success) {
            savedEmails.shift(); // Retirer l'email réussi
            localStorage.setItem(key, JSON.stringify(savedEmails));
            console.log('✅ Email Angular 19 retry réussi !');
          }
          return [result];
        }),
        catchError((error) => {
          console.log('❌ Retry Angular 19 échoué:', error);
          return of([{ success: false, error: error.message }]);
        })
      );
    } catch (e) {
      console.error('❌ Erreur retry Angular 19:', e);
      return of([]);
    }
  }
}
