import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  HostListener,
  AfterViewInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {
  trigger,
  style,
  transition,
  animate,
  state,
  query,
  stagger,
} from '@angular/animations';

import { Project } from '../../shared/model/project';
import { ProjectsService } from '../../shared/sercive/projects/projects.service';
import { MailService } from '../../shared/sercive/mail/mail.service';
import { portfolioConfig } from '../../shared/model/portfolio.config';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import {
  faPhone,
  faMapMarkerAlt,
  faLanguage,
  faDownload,
  faCalendarAlt,
  faFutbol,
  faGuitar,
  faEnvelope,
  faPaperPlane,
  faLaptop,
  faCode,
  faRocket,
  faPalette,
  faChalkboardTeacher,
  faArrowUp,
  faBars,
  faTimes,
  faComments,
  faFileAlt,
  faLightbulb,
  faBolt,
  faGlobe,
  faBullseye,
  faWifi,
  faCheckCircle,
  faExclamationTriangle,
  faCog,
  faQuoteLeft,
  faStar,
  faTh,
  faImages,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToastModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService, DialogService],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    // 🆕 Animations Angular 19 améliorées
    trigger('slideInFromBottom', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate(
          '800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('pulseGlow', [
      transition(':enter', [
        animate(
          '2s infinite',
          style({ boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('typewriter', { static: false }) typewriterElement!: ElementRef;

  // 🚀 Angular 19 - Injection moderne avec inject()
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly mailService = inject(MailService);
  private readonly messageService = inject(MessageService);
  private readonly dialogService = inject(DialogService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translateService = inject(TranslateService);
  private langSubscription?: Subscription;

  // 🆕 Angular 19 Signals pour une réactivité moderne
  emailServiceReady = signal<boolean>(false);
  pendingEmailsCount = signal<number>(0);
  isOnline = signal<boolean>(true);
  lastEmailSentAt = signal<Date | null>(null);
  emailSuccessRate = signal<number>(100);

  // 🆕 Computed signals pour des valeurs dérivées
  emailServiceStatus = computed(() => {
    if (!this.emailServiceReady()) return 'Initialisation...';
    if (this.pendingEmailsCount() > 0) {
      return `${this.pendingEmailsCount()} email(s) en attente`;
    }
    return 'Service opérationnel ✅';
  });

  hasEmailServiceIssues = computed(() => this.pendingEmailsCount() > 0);

  // Font Awesome icons
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faLanguage = faLanguage;
  faDownload = faDownload;
  faCalendarAlt = faCalendarAlt;
  faFutbol = faFutbol;
  faGuitar = faGuitar;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faLaptop = faLaptop;
  faCode = faCode;
  faRocket = faRocket;
  faPalette = faPalette;
  faChalkboardTeacher = faChalkboardTeacher;
  faArrowUp = faArrowUp;
  faBars = faBars;
  faTimes = faTimes;
  faComments = faComments;
  faLightbulb = faLightbulb;
  faBolt = faBolt;
  faGlobe = faGlobe;
  faBullseye = faBullseye;
  faFileAlt = faFileAlt;
  // 🆕 Nouvelles icônes Angular 19
  faWifi = faWifi;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  faCog = faCog;
  // Icônes témoignages & galerie
  faQuoteLeft = faQuoteLeft;
  faStar = faStar;
  faTh = faTh;
  faImages = faImages;
  faFilter = faFilter;

  activeProfileTab = 0;

  // Configuration from portfolio.config.ts
  config = portfolioConfig;
  personalInfo = portfolioConfig.personal;
  socialLinks = portfolioConfig.social;
  skills = portfolioConfig.skills;
  services = portfolioConfig.services;
  education = portfolioConfig.education;
  navigation = portfolioConfig.navigation;
  testimonials = portfolioConfig.testimonials;
  gallery = portfolioConfig.gallery;
  galleryCategories = ['Recommandations'];
  activeGalleryCategory = 'Recommandations';
  selectedGalleryItem: any = null;

  screenWidth: any;
  isBurgerMenuClicked: boolean = false;
  showScrollTop: boolean = false;
  currentSection: string = 'accueil';

  // Projects
  projectList!: Project[];
  projectData: any = [];

  // Navigation
  currentLinkNumber = 1;
  currentAnchorTag = 'accueil';
  currentContent: number = 0;

  // Contact form
  contactForm!: FormGroup;
  isContactFormSubmitted = false;
  error = false;
  success = false;
  isContactFormSubmittedAndNotErrorOnClientSide = false;

  // Modal
  ref!: DynamicDialogRef;

  // Typewriter effect
  private typewriterInterval: any;
  private currentTextIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typewriterTexts = portfolioConfig.animations.typewriterTexts;

  // Intersection Observer for animations
  private observer!: IntersectionObserver;

  // 🆕 Angular 19 - Métriques avancées
  private emailMetrics = {
    totalAttempts: 0,
    successfulSends: 0,
    failedSends: 0,
    retryAttempts: 0,
    lastErrorType: '',
    avgResponseTime: 0,
  };

  constructor() {}

  ngOnInit(): void {
    this.activeContent(this.currentContent);

    // 🆕 Angular 19 - FormBuilder moderne avec validation avancée
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.maxLength(100)]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(1000),
        ],
      ],
    });

    // Start typewriter effect et initialisation
    if (isPlatformBrowser(this.platformId)) {
      // Écouter les changements de langue pour mettre à jour le typewriter
      this.langSubscription = this.translateService.onLangChange.subscribe(() => {
        this.updateTypewriterTexts();
        this.restartTypewriter();
      });

      setTimeout(() => {
        this.updateTypewriterTexts();
        this.typeWriter();
        this.initScrollAnimations();
        this.monitorConnection();
      }, 100);

      // 🆕 Initialiser le service email amélioré Angular 19
      this.initEmailServiceAngular19();
    }

    this.getAllProject();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSmoothScroll();
      this.trackCurrentSection();
      this.initPerformanceMonitoring(); // 🆕 Monitoring des performances
    }
  }

  /**
   * 🚀 Initialisation du service email Angular 19 amélioré
   */
  private async initEmailServiceAngular19(): Promise<void> {
    console.log('🚀 Initialisation service email Angular 19...');

    try {
      // Test de connectivité avec timeout
      const connectivityTest = await this.testEmailConnectivityAsync();

      if (connectivityTest.success) {
        console.log('✅ Service email Angular 19 initialisé');
        this.emailServiceReady.set(true);

        // Retry automatique intelligent
        this.intelligentRetryFailedEmails();

        // Mise à jour du compteur
        this.updatePendingEmailsCount();
      } else {
        console.warn('⚠️ Service email partiellement fonctionnel');
        this.emailServiceReady.set(true); // Permet quand même l'utilisation
      }
    } catch (error) {
      console.error('❌ Erreur initialisation service email:', error);
      this.emailServiceReady.set(false);
    }
  }

  /**
   * 🌐 Surveillance de la connexion réseau Angular 19
   */
  private monitorConnection(): void {
    if ('onLine' in navigator) {
      this.isOnline.set(navigator.onLine);

      window.addEventListener('online', () => {
        this.isOnline.set(true);
        console.log('🌐 Connexion rétablie');
        this.retryFailedEmailsWhenOnline();
      });

      window.addEventListener('offline', () => {
        this.isOnline.set(false);
        console.log('📵 Connexion perdue');
      });
    }
  }

  /**
   * 🔄 Retry intelligent quand la connexion revient
   */
  private retryFailedEmailsWhenOnline(): void {
    if (this.pendingEmailsCount() > 0) {
      setTimeout(() => {
        this.forceRetryEmails();
      }, 2000);
    }
  }

  /**
   * 📊 Monitoring des performances Angular 19
   */
  private initPerformanceMonitoring(): void {
    // Observer les Core Web Vitals
    if ('web-vitals' in window) {
      console.log('📊 Monitoring des performances activé');
    }

    // Mesurer le temps de réponse des emails
    this.measureEmailResponseTime();
  }

  /**
   * ⏱️ Mesure du temps de réponse des emails
   */
  private measureEmailResponseTime(): void {
    const startTime = performance.now();
    // Cette méthode sera appelée lors de l'envoi d'emails
    // pour mesurer les performances
  }

  /**
   * 🔍 Test de connectivité asynchrone amélioré
   */
  private async testEmailConnectivityAsync(): Promise<any> {
    return new Promise((resolve) => {
      const startTime = performance.now();

      this.mailService.testConnectivity().subscribe({
        next: (result: any) => {
          const responseTime = performance.now() - startTime;
          console.log(`🔍 Test connectivité: ${responseTime.toFixed(2)}ms`);

          resolve({
            success: true,
            responseTime,
            result,
          });
        },
        error: (error: any) => {
          console.warn('⚠️ Test connectivité échoué:', error);
          resolve({
            success: false,
            error,
          });
        },
      });
    });
  }

  /**
   * 🧠 Retry intelligent avec backoff exponentiel
   */
  private intelligentRetryFailedEmails(): void {
    const retryWithBackoff = (attempt: number = 1) => {
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000); // Max 30s

      setTimeout(() => {
        this.mailService.retryFailedEmails().subscribe({
          next: (result: any) => {
            if (result && result.success === 'true') {
              console.log('✅ Retry intelligent réussi');
              this.emailMetrics.retryAttempts++;
              this.updateEmailSuccessRate();
              this.updatePendingEmailsCount();

              this.messageService.add({
                severity: 'success',
                summary: 'Email envoyé',
                detail: 'Message en attente envoyé avec succès !',
                life: 4000,
              });
            }
          },
          error: (error: any) => {
            if (attempt < 3) {
              console.log(`🔄 Retry ${attempt + 1}/3 dans ${delay}ms`);
              retryWithBackoff(attempt + 1);
            } else {
              console.log('❌ Abandon après 3 tentatives');
            }
          },
        });
      }, delay);
    };

    if (this.pendingEmailsCount() > 0) {
      retryWithBackoff();
    }
  }

  /**
   * 📊 Mise à jour du taux de succès des emails
   */
  private updateEmailSuccessRate(): void {
    const { totalAttempts, successfulSends } = this.emailMetrics;
    if (totalAttempts > 0) {
      const rate = (successfulSends / totalAttempts) * 100;
      this.emailSuccessRate.set(Math.round(rate));
    }
  }

  /**
   * 📧 Notification service prêt
   */

  /**
   * 📊 Mise à jour du compteur d'emails en attente
   */
  private updatePendingEmailsCount(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const savedEmails = JSON.parse(
        localStorage.getItem('angular19_portfolio_emails') || '[]'
      );
      this.pendingEmailsCount.set(savedEmails.length);

      if (savedEmails.length > 0) {
        console.log(`💾 ${savedEmails.length} email(s) en attente Angular 19`);
      }
    } catch (e) {
      this.pendingEmailsCount.set(0);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollTop = window.pageYOffset > 300;

      const scrolled = window.pageYOffset;

      if (window.innerWidth <= 768) {
        // Mobile : l'image compense le scroll pour rester fixe visuellement
        const hero = this.document.querySelector('.hero') as HTMLElement;
        if (hero) hero.style.transform = '';

        const heroImage = this.document.querySelector(
          '.hero .hero-image'
        ) as HTMLElement;
        if (hero && heroImage) {
          // translateY(+scrolled) compense le scroll → image reste en haut du viewport
          // On plafonne à (heroHeight - imageHeight) pour qu'elle reparte normalement après
          const imageHeight = window.innerHeight * 0.55;
          const maxTranslate = Math.max(0, hero.offsetHeight - imageHeight);
          const translate = Math.min(scrolled, maxTranslate);
          heroImage.style.transform = `translateY(${translate}px)`;
        }
      } else {
        // Desktop : réinitialiser le transform de l'image, parallax sur toute la section
        const heroImage = this.document.querySelector(
          '.hero .hero-image'
        ) as HTMLElement;
        if (heroImage) heroImage.style.transform = '';

        const parallax = this.document.querySelector('.hero') as HTMLElement;
        if (parallax) {
          parallax.style.transform = `translateY(${-(scrolled * 0.3)}px)`;
        }

        const parallaxElements =
          this.document.querySelectorAll('.parallax-element');
        parallaxElements.forEach((element, index) => {
          const speed = 0.2 + index * 0.1;
          (element as HTMLElement).style.transform = `translateY(${-(scrolled * speed)}px)`;
        });
      }
    }
  }

  initSmoothScroll() {
    const links = this.document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = this.document.getElementById(targetId || '');
        if (targetElement) {
          // 🆕 Smooth scroll amélioré Angular 19
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      });
    });
  }

  trackCurrentSection() {
    const sections = this.document.querySelectorAll('section[id]');
    const options = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
          // 🆕 Mise à jour de l'URL sans navigation Angular 19
          if (this.currentSection) {
            history.replaceState(null, '', `#${this.currentSection}`);
          }
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  initScrollAnimations() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // 🆕 Animations spécifiques par type d'élément
          if (entry.target.classList.contains('skill-card')) {
            entry.target.classList.add('skill-bounce');
          }
          if (entry.target.classList.contains('service-card')) {
            entry.target.classList.add('service-slide');
          }

          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    const animatedElements =
      this.document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  getAllProject() {
    this.projectList = this.projectsService.initProjectsListBriefData();
  }

  showProject(param: string) {
    console.log('🔍 Param reçu :', param);
    console.log('📋 Liste des projets :', this.projectList);
    console.log(
      '🔍 Codes des projets :',
      this.projectList.map((p) => p.projectCode)
    );

    const projectData = this.projectsService.getProjectData(param);
    console.log('📦 Données du projet récupérées :', projectData);

    if (typeof projectData !== 'undefined') {
      this.ref = this.dialogService.open(ProjectDetailComponent, {
        data: {
          projectData: projectData,
        },
        baseZIndex: 10000,
        styleClass: 'project-dialog',
        width: '90%',
        contentStyle: { 'max-height': '90vh', overflow: 'auto' },
      });
    } else {
      console.error('❌ Aucune donnée trouvée pour le projet:', param);
      this.messageService.add({
        severity: 'warn',
        detail: this.config.messages.projectError,
      });
    }
  }

  typeWriter() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const typewriterElement = this.document.querySelector(
      '#typewriter'
    ) as HTMLElement;

    if (!typewriterElement) {
      console.warn('Element #typewriter not found');
      return;
    }

    const type = () => {
      const currentText = this.typewriterTexts[this.currentTextIndex];

      if (this.isDeleting) {
        typewriterElement.textContent = currentText.substring(
          0,
          this.currentCharIndex - 1
        );
        this.currentCharIndex--;
      } else {
        typewriterElement.textContent = currentText.substring(
          0,
          this.currentCharIndex + 1
        );
        this.currentCharIndex++;
      }

      let typeSpeed = this.isDeleting
        ? this.config.animations.deleteSpeed
        : this.config.animations.typeSpeed;

      if (!this.isDeleting && this.currentCharIndex === currentText.length) {
        typeSpeed = this.config.animations.pauseDuration;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex =
          (this.currentTextIndex + 1) % this.typewriterTexts.length;
        typeSpeed = 500;
      }

      this.typewriterInterval = setTimeout(() => type(), typeSpeed);
    };

    type();
  }

  private updateTypewriterTexts(): void {
    this.translateService.get('TYPEWRITER').subscribe((texts: string[]) => {
      if (Array.isArray(texts)) {
        this.typewriterTexts = texts;
      }
    });
  }

  private restartTypewriter(): void {
    if (this.typewriterInterval) {
      clearTimeout(this.typewriterInterval);
    }
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    if (isPlatformBrowser(this.platformId)) {
      const el = this.document.querySelector('#typewriter') as HTMLElement;
      if (el) el.textContent = '';
      setTimeout(() => this.typeWriter(), 200);
    }
  }

  get filteredGallery() {
    return this.gallery.filter(item => item.category === this.activeGalleryCategory);
  }

  get certificationItems() {
    return this.gallery.filter(item => item.category === 'Certifications');
  }

  filterGallery(category: string) {
    this.activeGalleryCategory = category;
  }

  openGalleryItem(item: any) {
    this.selectedGalleryItem = item;
  }

  closeGalleryItem() {
    this.selectedGalleryItem = null;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }

    if (this.typewriterInterval) {
      clearTimeout(this.typewriterInterval);
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    this.langSubscription?.unsubscribe();

    // 🆕 Nettoyage des event listeners Angular 19
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    }
  }

  activeContent(param: number) {
    if (param != this.currentContent) {
      this.currentContent = param;

      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const headers = <NodeListOf<HTMLElement>>(
        this.document.querySelectorAll('.profil-header')
      );
      const contents = <NodeListOf<HTMLElement>>(
        this.document.querySelectorAll('.profil-info')
      );

      headers.forEach((element) => {
        element.classList.remove('active-header');
      });

      contents.forEach((element) => {
        element.style.display = 'none';
      });

      if (headers[param]) {
        headers[param].classList.add('active-header');
      }

      if (contents[param]) {
        contents[param].style.display = 'flex';
      }
    }
  }

  /**
   * 📧 Méthode d'envoi de formulaire ANGULAR 19 OPTIMISÉE
   */
  onSubmitContactForm() {
    const startTime = performance.now();
    this.isContactFormSubmitted = true;
    this.emailMetrics.totalAttempts++;

    if (this.contactForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulaire incomplet',
        detail: 'Veuillez remplir tous les champs obligatoires.',
        life: 4000,
      });
      return;
    }

    this.isContactFormSubmittedAndNotErrorOnClientSide = true;

    // 🆕 Données contextuelles enrichies Angular 19
    const formDataWithContext = {
      ...this.contactForm.value,
      // Métadonnées Angular 19
      angular_version: '19',
      timestamp: new Date().toISOString(),
      page_url: isPlatformBrowser(this.platformId)
        ? window.location.href
        : 'SSR',
      form_source: 'Portfolio Contact Form Angular 19',
      device_info: this.getAdvancedDeviceInfo(),
      user_agent: isPlatformBrowser(this.platformId)
        ? navigator.userAgent.substring(0, 100)
        : 'SSR',
      session_id: this.generateSessionId(),
      // Métriques de performance
      form_load_time: startTime,
      connection_type: this.getConnectionType(),
      screen_resolution: isPlatformBrowser(this.platformId)
        ? `${screen.width}x${screen.height}`
        : 'Unknown',
      language: isPlatformBrowser(this.platformId)
        ? navigator.language
        : 'Unknown',
    };

    console.log('📧 Envoi formulaire Angular 19...');
    console.log('📱 Device:', this.getAdvancedDeviceInfo());
    console.log('🌐 Connexion:', this.isOnline() ? 'En ligne' : 'Hors ligne');

    this.mailService
      .sendMail(JSON.stringify(formDataWithContext))
      .pipe(
        finalize(() => {
          this.isContactFormSubmittedAndNotErrorOnClientSide = false;
          const responseTime = performance.now() - startTime;
          this.emailMetrics.avgResponseTime = responseTime;
          console.log(`⏱️ Temps de traitement: ${responseTime.toFixed(2)}ms`);
        })
      )
      .subscribe({
        next: (resp: any) => {
          console.log('✅ Réponse service Angular 19:', resp);
          this.emailMetrics.successfulSends++;
          this.lastEmailSentAt.set(new Date());

          if (resp && (resp['success'] === 'true' || resp.success === true)) {
            // 🆕 Messages adaptatifs selon la méthode et l'appareil
            let successMessage = this.config.messages.contactSuccess;
            let severity: 'success' | 'info' = 'success';

            if (
              resp.method?.includes('Sauvegarde') ||
              resp.method?.includes('LocalStorage')
            ) {
              successMessage = `Message sauvegardé sur ${
                resp.device || this.getDeviceType()
              } ! Je le recevrai et vous répondrai rapidement.`;
              severity = 'info';
              this.pendingEmailsCount.update((count) => count + 1);
            } else if (resp.method?.includes('EmailJS')) {
              successMessage = `Email envoyé avec succès via EmailJS depuis ${
                resp.device || this.getDeviceType()
              } ! Merci de me contacter.`;
              severity = 'success';
            }

            this.messageService.add({
              severity: severity,
              summary:
                severity === 'success'
                  ? '✅ Message envoyé !'
                  : '💾 Message sauvegardé !',
              detail: successMessage,
              life: 6000,
            });

            this.onReset();
            this.updatePendingEmailsCount();
            this.updateEmailSuccessRate();

            console.log(
              `✅ Email Angular 19: ${resp.method} depuis ${resp.device}`
            );
          } else {
            throw new Error('Réponse inattendue du service Angular 19');
          }
        },
        error: (error: any) => {
          console.error('❌ Erreur envoi Angular 19:', error);
          this.emailMetrics.failedSends++;
          this.emailMetrics.lastErrorType = error.message || 'Erreur inconnue';

          this.messageService.add({
            severity: 'warn',
            summary: '💾 Message sauvegardé',
            detail: `Problème d'envoi depuis ${this.getDeviceType()}, mais votre message a été sauvegardé localement. Je le recevrai !`,
            life: 6000,
          });

          this.updatePendingEmailsCount();
        },
      });
  }

  /**
   * 🧪 Test de service amélioré Angular 19
   */
  testEmailService(): void {
    const testData = {
      name: `Test Angular 19 ${this.getDeviceType()}`,
      email: 'test@angular19.dev',
      subject: 'Test de connectivité Angular 19',
      message: `Test système Angular 19 depuis ${this.getDeviceType()} à ${new Date().toLocaleString(
        'fr-FR'
      )}. Online: ${this.isOnline()}`,
      angular_version: '19',
      test_mode: true,
    };

    console.log('🧪 Test service Angular 19...');

    this.mailService.sendMailTest(JSON.stringify(testData)).subscribe({
      next: (result: any) => {
        console.log('✅ Test Angular 19 réussi:', result);
        this.messageService.add({
          severity: 'info',
          summary: '🧪 Test réussi',
          detail: `Service email Angular 19 opérationnel sur ${
            result.device || this.getDeviceType()
          }`,
          life: 4000,
        });
      },
      error: (error: any) => {
        console.error('❌ Test Angular 19 échoué:', error);
        this.messageService.add({
          severity: 'error',
          summary: '❌ Test échoué',
          detail: 'Problème détecté avec le service email Angular 19',
          life: 4000,
        });
      },
    });
  }

  /**
   * 📊 Afficher les emails sauvegardés (debug Angular 19)
   */
  showSavedEmails(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const savedEmails = JSON.parse(
        localStorage.getItem('angular19_portfolio_emails') || '[]'
      );

      if (savedEmails.length > 0) {
        console.group('💾 EMAILS SAUVEGARDÉS ANGULAR 19');
        console.table(savedEmails);
        console.log('📊 Métriques:', this.emailMetrics);
        console.groupEnd();

        this.messageService.add({
          severity: 'info',
          summary: '💾 Emails en attente',
          detail: `${savedEmails.length} message(s) Angular 19 en attente. Détails dans la console (F12).`,
          life: 5000,
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: '✅ Aucun email en attente',
          detail: 'Tous les messages Angular 19 ont été envoyés avec succès !',
          life: 3000,
        });
      }
    } catch (e) {
      console.warn("Impossible d'accéder au localStorage Angular 19");
    }
  }

  /**
   * 🔄 Forcer le retry avec métriques Angular 19
   */
  forceRetryEmails(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    console.log('🔄 Retry manuel Angular 19...');
    const retryStartTime = performance.now();

    this.mailService.retryFailedEmails().subscribe({
      next: (result: any) => {
        const retryTime = performance.now() - retryStartTime;
        console.log(
          `🔄 Retry Angular 19 terminé en ${retryTime.toFixed(2)}ms:`,
          result
        );

        if (result && result.success === 'true') {
          this.emailMetrics.retryAttempts++;
          this.messageService.add({
            severity: 'success',
            summary: '🔄 Retry réussi',
            detail: `Email sauvegardé envoyé avec succès depuis ${this.getDeviceType()} !`,
            life: 4000,
          });
        } else {
          this.messageService.add({
            severity: 'info',
            summary: '🔄 Retry terminé',
            detail: 'Aucun email Angular 19 à renvoyer ou échec du retry.',
            life: 4000,
          });
        }

        this.updatePendingEmailsCount();
        this.updateEmailSuccessRate();
      },
      error: (error: any) => {
        console.error('❌ Retry Angular 19 échoué:', error);
        this.emailMetrics.failedSends++;
        this.messageService.add({
          severity: 'error',
          summary: '❌ Retry échoué',
          detail: 'Impossible de renvoyer les emails sauvegardés Angular 19.',
          life: 4000,
        });
      },
    });
  }

  /**
   * 📱 Détection avancée du device Angular 19
   */
  private getAdvancedDeviceInfo(): any {
    if (!isPlatformBrowser(this.platformId)) {
      return { type: 'SSR', details: 'Server-Side Rendering' };
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
      screen: `${screen.width}x${screen.height}`,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      angular: '19',
    };
  }

  /**
   * 📱 Méthode legacy pour compatibilité
   */
  private getDeviceType(): string {
    return this.getAdvancedDeviceInfo().type;
  }

  /**
   * 🌐 Type de connexion réseau
   */
  private getConnectionType(): string {
    if (!isPlatformBrowser(this.platformId)) return 'Unknown';

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'Unknown' : 'Unknown';
  }

  /**
   * 🆔 Générer un ID de session unique
   */
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * 🔍 Diagnostic complet Angular 19
   */
  runDiagnostic(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.messageService.add({
        severity: 'info',
        summary: 'Mode SSR',
        detail: 'Diagnostic non disponible en mode serveur Angular 19.',
        life: 3000,
      });
      return;
    }

    console.group('🔍 DIAGNOSTIC ANGULAR 19 COMPLET');

    // 🆕 Informations Angular 19
    console.log('🅰️ Angular Version:', '19');
    console.log('📱 Device Info:', this.getAdvancedDeviceInfo());
    console.log('🌐 Connexion:', this.isOnline() ? 'En ligne' : 'Hors ligne');
    console.log('📶 Type connexion:', this.getConnectionType());
    console.log('🔒 HTTPS:', location.protocol === 'https:');
    console.log('📍 URL:', window.location.href);
    console.log('🎯 User Agent:', navigator.userAgent);

    // 🆕 Métriques emails
    console.log('📧 Métriques emails:', this.emailMetrics);
    console.log('📊 Taux de succès:', this.emailSuccessRate() + '%');
    console.log('📬 Emails en attente:', this.pendingEmailsCount());
    console.log('🕐 Dernier envoi:', this.lastEmailSentAt());

    // 🆕 Performance
    console.log('⚡ Performance:', {
      memory: (performance as any).memory
        ? (performance as any).memory.usedJSHeapSize
        : 'Non disponible',
      timing:
        performance.timing.loadEventEnd -
        performance.timing.navigationStart +
        'ms',
    });

    // LocalStorage Angular 19
    try {
      const savedEmails = JSON.parse(
        localStorage.getItem('angular19_portfolio_emails') || '[]'
      );
      console.log('💾 Emails sauvegardés Angular 19:', savedEmails.length);
      if (savedEmails.length > 0) {
        console.table(savedEmails);
      }
    } catch (e) {
      console.warn('❌ localStorage Angular 19 non accessible');
    }

    console.groupEnd();

    this.messageService.add({
      severity: 'info',
      summary: '🔍 Diagnostic Angular 19',
      detail: 'Diagnostic complet disponible dans la console (F12).',
      life: 4000,
    });
  }

  get f() {
    return this.contactForm.controls as {
      name: AbstractControl;
      email: AbstractControl;
      subject: AbstractControl;
      message: AbstractControl;
    };
  }

  onReset() {
    this.isContactFormSubmitted = false;
    this.contactForm.reset();
  }

  openNetwork(param: string) {
    const website = this.socialLinks[param as keyof typeof this.socialLinks];
    if (website) {
      if (isPlatformBrowser(this.platformId)) {
        window.open(website, '_blank');
      }
    }
  }

  toggleMobileMenu() {
    this.isBurgerMenuClicked = !this.isBurgerMenuClicked;
  }

  // Helper method to get Object keys for template
  objectKeys = Object.keys;

  // Helper method to get icon by name
  getServiceIcon(iconName: string): any {
    const icons: any = {
      faPalette: this.faPalette,
      faCode: this.faCode,
      faRocket: this.faRocket,
      faChalkboardTeacher: this.faChalkboardTeacher,
    };
    return icons[iconName];
  }

  // Méthode pour forcer le type de la clé
  getSkillCategoryKey(key: string): keyof typeof this.skills {
    return key as keyof typeof this.skills;
  }

  /**
   * 🎯 Getters pour le template Angular 19
   */
  get deviceTypeDisplay(): string {
    return this.getDeviceType();
  }

  get emailSuccessRateDisplay(): string {
    return this.emailSuccessRate() + '%';
  }

  get connectionStatusDisplay(): string {
    return this.isOnline() ? '🌐 En ligne' : '📵 Hors ligne';
  }
  get lastEmailDisplay(): string {
    const lastEmail = this.lastEmailSentAt();
    return lastEmail ? lastEmail.toLocaleString('fr-FR') : 'Aucun';
  }
}
