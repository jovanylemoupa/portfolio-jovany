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
} from '@fortawesome/free-solid-svg-icons';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToastModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
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
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('typewriter', { static: false }) typewriterElement!: ElementRef;

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
  private typewriterTexts = [
    'Développeur Web',
    'Web Designer',
    'Développeur Full-Stack',
    "Créateur d'expériences digitales",
  ];

  // Intersection Observer for animations
  private observer!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private mailService: MailService,
    private messageService: MessageService,
    public dialogService: DialogService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.activeContent(this.currentContent);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });

    // Start typewriter effect
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.typeWriter();
        this.initScrollAnimations();
      }, 100);
    }

    this.getAllProject();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize smooth scroll
      this.initSmoothScroll();

      // Track current section
      this.trackCurrentSection();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollTop = window.pageYOffset > 300;

      // Add parallax effect
      const scrolled = window.pageYOffset;
      const parallax = this.document.querySelector('.hero') as HTMLElement;
      if (parallax) {
        const yPos = -(scrolled * 0.5);
        parallax.style.transform = `translateY(${yPos}px)`;
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
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  trackCurrentSection() {
    const sections = this.document.querySelectorAll('section[id]');
    const options = {
      rootMargin: '-50% 0px -50% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getAllProject() {
    this.projectList = this.projectsService.initProjectsListBriefData();
  }

  showProject(param: string) {
    const projectData = this.projectsService.getProjectData(param);

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
      this.messageService.add({
        severity: 'warn',
        detail:
          "Projet en phase d'initialisation. Veuillez réessayer plus tard.",
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

      let typeSpeed = this.isDeleting ? 30 : 80;

      if (!this.isDeleting && this.currentCharIndex === currentText.length) {
        typeSpeed = 2000;
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

  onSubmitContactForm() {
    this.isContactFormSubmitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isContactFormSubmittedAndNotErrorOnClientSide = true;

    this.mailService
      .sendMail(JSON.stringify(this.contactForm.value))
      .pipe(
        finalize(
          () => (this.isContactFormSubmittedAndNotErrorOnClientSide = false)
        )
      )
      .subscribe((resp: any) => {
        if (resp['success'] === 'true') {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Message envoyé avec succès!',
            life: 5000,
          });
          this.onReset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Erreur lors de l'envoi du message. Veuillez réessayer.",
            life: 5000,
          });
        }
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
    let website;
    if (param === 'linkedin') {
      website = 'https://www.linkedin.com/in/bonachisamuel';
    } else if (param === 'instagram') {
      website = 'https://www.instagram.com/zrotof_';
    } else if (param == 'github') {
      website = 'https://github.com/zrotof';
    }

    window.open(website, '_blank');
  }

  toggleMobileMenu() {
    this.isBurgerMenuClicked = !this.isBurgerMenuClicked;
  }
}
