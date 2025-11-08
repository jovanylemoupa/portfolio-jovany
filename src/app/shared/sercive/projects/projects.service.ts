import { Injectable } from '@angular/core';
import { Project } from '../../model/project';

// Interface étendue pour les projets avec nouvelles propriétés
export interface ExtendedProject extends Project {
  tags?: string[];
  category?: 'web' | 'mobile' | 'fullstack' | 'api';
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  featured?: boolean;
  status?: 'terminé' | 'en cours' | 'maintenance';
  description?: string;
  challenges?: string[];
  results?: string[];
}

// Interface pour les certifications
export interface Certification {
  name: string;
  organization: string;
  date: string;
  credentialId?: string;
  logoUrl: string;
}

// Interface pour les témoignages
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsListBriefData!: ExtendedProject[];
  projectsListAllData: any[] = [];
  certifications: Certification[] = [];
  testimonials: Testimonial[] = [];

  constructor() {}

  initProjectsListBriefData(): ExtendedProject[] {
    return (this.projectsListBriefData = [
      {
        projectTitle: 'Gestion Fabrique Pro',
        projectImage: 'img/gestion-fabrique.png',
        projectSummary:
          "Application web complète pour la gestion d'une entreprise de production : gestion des stocks, production, commandes, personnel et tableau de bord interactif.",
        projectImageAltAttribute:
          "Interface de gestion d'une fabrique de construction",
        projectCode: 'gestion-fabrique',
        tags: ['PHP', 'JavaScript', 'MySQL', 'HTML/CSS', 'ERP', 'Fullstack'],
        category: 'fullstack',
        demoUrl: 'https://tonportfolio.com/gestion-fabrique', // À remplacer par ton lien réel
        githubUrl: 'https://github.com/ton-username/gestion-fabrique', // Remplace aussi ici
        technologies: [
          'PHP',
          'JavaScript',
          'HTML5',
          'CSS3',
          'MySQL',
          'Bootstrap',
        ],
        featured: true,
        status: 'terminé',
        description:
          "Une solution conçue pour optimiser la gestion opérationnelle d'une entreprise industrielle, avec un tableau de bord de performance et une interface intuitive.",
        challenges: [
          'Centralisation de toutes les données de production',
          'Interface claire pour des utilisateurs non techniques',
          'Gestion temps réel des stocks et du personnel',
        ],
        results: [
          'Gain de temps sur la planification de production',
          'Amélioration du suivi des commandes clients',
          'Vue d’ensemble claire des indicateurs de performance',
        ],
      },
      {
        projectTitle: 'Restaurant Management Pro',
        projectImage: 'img/restaurant.png',
        projectSummary:
          'Système complet de gestion restaurant avec commande en ligne, gestion stocks, analytics et interface admin avancée.',
        projectImageAltAttribute: 'Interface de gestion restaurant',
        projectCode: 'restaurant',
        tags: ['Angular', 'Node.js', 'MongoDB', 'PrimeNG', 'E-commerce'],
        category: 'fullstack',
        demoUrl: 'https://restaurant.sm-digitalizer.fr',
        githubUrl: 'https://github.com/votre-username/restaurant',
        technologies: [
          'Angular 12',
          'PrimeNG',
          'Node.js',
          'MongoDB Atlas',
          'JWT',
          'Stripe',
          'Socket.io',
          'PWA',
        ],
        featured: true,
        status: 'terminé',
        description:
          'Solution tout-en-un pour la digitalisation complète des restaurants.',
        challenges: [
          'Gestion des commandes en temps réel',
          'Synchronisation multi-appareils',
          'Intégration paiements sécurisés',
        ],
        results: [
          '95% de satisfaction client',
          "40% d'augmentation des commandes en ligne",
          'Interface multilingue déployée',
        ],
      },

      {
        projectTitle: 'Elites Voyages - Plateforme Voyage',
        projectImage: 'img/ev.png',
        projectSummary:
          "Plateforme complète d'agence de voyage avec réservation vols/hôtels, gestion clientèle et backoffice administratif.",
        projectImageAltAttribute: 'Plateforme de réservation voyage',
        projectCode: 'elitesvoyages',
        tags: ['Angular', 'Node.js', 'MongoDB', 'Amadeus API', 'Travel Tech'],
        category: 'fullstack',
        demoUrl: 'https://elites-voyages.com',
        githubUrl: 'https://github.com/votre-username/elites-voyages',
        technologies: [
          'Angular 12',
          'PrimeNG',
          'Node.js',
          'MongoDB',
          'Amadeus API',
          'PayPal',
          'Microanalytics',
          'SEO',
        ],
        featured: true,
        status: 'maintenance',
        description: 'Écosystème complet pour agence de voyage moderne.',
        challenges: [
          'Intégration API Amadeus complexe',
          'Gestion multi-devises temps réel',
          'Optimisation SEO internationale',
        ],
        results: [
          '300+ destinations disponibles',
          'Formation équipe réalisée',
          'ROI client +250% première année',
        ],
      },
      {
        projectTitle: 'E-Learning Platform',
        projectSummary:
          "Plateforme d'apprentissage en ligne avec cours interactifs, système de notation et suivi progression étudiant/formateur.",
        projectImageAltAttribute: 'Interface de la plateforme e-learning',
        projectCode: 'elearning-platform',
        tags: ['Angular', 'Node.js', 'MongoDB', 'WebRTC', 'Education'],
        category: 'fullstack',
        demoUrl: 'https://demo-elearning.com',
        githubUrl: 'https://github.com/votre-username/elearning',
        technologies: [
          'Angular 17',
          'Node.js',
          'MongoDB',
          'WebRTC',
          'Socket.io',
          'FFmpeg',
          'Redis',
          'AWS S3',
        ],
        featured: true,
        status: 'en cours',
        description:
          "Solution moderne d'apprentissage à distance avec fonctionnalités avancées.",
        challenges: [
          'Streaming vidéo haute qualité',
          'Système de notation automatique',
          'Collaboration temps réel',
        ],
        results: [
          "Support jusqu'à 500 utilisateurs simultanés",
          "Taux d'engagement +80%",
          'Interface mobile responsive',
        ],
      },
      {
        projectTitle: 'API Gateway Microservices',
        projectSummary:
          'Architecture microservices avec API Gateway, authentification centralisée, monitoring et documentation automatique.',
        projectImageAltAttribute: 'Architecture microservices',
        projectCode: 'api-gateway',
        tags: ['Node.js', 'Docker', 'Kubernetes', 'Microservices', 'DevOps'],
        category: 'api',
        demoUrl: 'https://api-docs.exemple.com',
        githubUrl: 'https://github.com/votre-username/api-gateway',
        technologies: [
          'Node.js',
          'Express',
          'Docker',
          'Kubernetes',
          'Redis',
          'PostgreSQL',
          'Swagger',
          'Prometheus',
        ],
        featured: false,
        status: 'terminé',
        description: 'Infrastructure scalable pour applications enterprise.',
        challenges: [
          'Orchestration de conteneurs',
          'Load balancing intelligent',
          'Monitoring temps réel',
        ],
        results: [
          '99.9% uptime garanti',
          'Réduction latence -60%',
          'Documentation auto-générée',
        ],
      },
      {
        projectTitle: 'Sscovid19 - Tracker Épidémie',
        projectImage: 'img/sscovid19.png',
        projectSummary:
          "Application web de suivi en temps réel de l'évolution de la COVID-19 avec visualisations interactives et analyses par pays/continents.",
        projectImageAltAttribute: 'Dashboard de suivi COVID-19',
        projectCode: 'sscovid19',
        tags: [
          'Angular',
          'Node.js',
          'PostgreSQL',
          'Data Visualization',
          'API REST',
        ],
        category: 'fullstack',
        demoUrl: 'https://sscovid19.com',
        githubUrl: 'https://github.com/votre-username/sscovid19',
        technologies: [
          'Angular 11',
          'TypeScript',
          'Node.js',
          'Express.js',
          'PostgreSQL',
          'AmCharts',
          'Docker',
          'Nginx',
        ],
        featured: true,
        status: 'terminé',
        description:
          'Plateforme complète de surveillance épidémiologique avec mise à jour automatique des données.',
        challenges: [
          'Traitement de gros volumes de données en temps réel',
          'Optimisation des performances pour les graphiques complexes',
          'Synchronisation multi-sources de données internationales',
        ],
        results: [
          '215+ pays suivis quotidiennement',
          '50k+ utilisateurs actifs mensuels',
          'Mise à jour automatique toutes les 45 minutes',
        ],
      },
      {
        projectTitle: 'Mobile Fitness Tracker',
        projectSummary:
          'Application mobile complète de fitness avec programmes personnalisés, suivi biométrique et communauté sociale.',
        projectImageAltAttribute: 'Application mobile fitness',
        projectCode: 'mobile-fitness',
        tags: ['Ionic', 'Angular', 'Firebase', 'Health Kit', 'Mobile'],
        category: 'mobile',
        demoUrl: 'https://fitness-demo.com',
        githubUrl: 'https://github.com/votre-username/fitness-app',
        technologies: [
          'Ionic',
          'Angular',
          'Firebase',
          'Capacitor',
          'Health Kit',
          'Google Fit',
          'Push Notifications',
        ],
        featured: true,
        status: 'terminé',
        description:
          'Compagnon fitness intelligent avec IA pour recommandations personnalisées.',
        challenges: [
          'Synchronisation wearables multiples',
          'Algorithmes recommandation IA',
          'Performance sur anciens devices',
        ],
        results: [
          '50k+ téléchargements',
          '4.7/5 étoiles stores',
          'Rétention utilisateur 75%',
        ],
      },
    ]);
  }

  getCertifications(): Certification[] {
    return (this.certifications = [
      {
        name: 'Angular Professional Developer',
        organization: 'Google',
        date: '2024',
        credentialId: 'ANG-2024-001',
        logoUrl: 'img/certifications/angular.png',
      },
      {
        name: 'AWS Solutions Architect Associate',
        organization: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-SAA-2023',
        logoUrl: 'img/certifications/aws.png',
      },
      {
        name: 'MongoDB Developer Certification',
        organization: 'MongoDB University',
        date: '2023',
        logoUrl: 'img/certifications/mongodb.png',
      },
    ]);
  }

  getTestimonials(): Testimonial[] {
    return (this.testimonials = [
      {
        name: 'Marie Dubois',
        role: 'Chef de Projet',
        company: 'TechCorp',
        message:
          "Excellent développeur, très professionnel et à l'écoute. Le projet a été livré dans les temps avec une qualité exceptionnelle.",
        rating: 5,
      },
      {
        name: 'Jean Martin',
        role: 'Directeur Technique',
        company: 'InnovSoft',
        message:
          'Compétences techniques solides et grande autonomie. Je recommande vivement pour des projets complexes.',
        rating: 5,
      },
      {
        name: 'Sophie Laurent',
        role: 'Product Owner',
        company: 'StartupXYZ',
        message:
          'Communication excellente et solutions innovantes. Notre application a dépassé nos attentes.',
        rating: 4,
      },
    ]);
  }

  // 🚀 CORRECTION PRINCIPALE : Méthodes utilitaires existantes améliorées
  getFeaturedProjects(): ExtendedProject[] {
    const projects = this.initProjectsListBriefData();
    return projects.filter((project) => project.featured);
  }

  getProjectsByCategory(
    category: 'web' | 'mobile' | 'fullstack' | 'api'
  ): ExtendedProject[] {
    const projects = this.initProjectsListBriefData();
    return projects.filter((project) => project.category === category);
  }

  getAllCategories(): string[] {
    const projects = this.initProjectsListBriefData();
    const categories = projects
      .map((project) => project.category)
      .filter(Boolean);
    return [...new Set(categories)] as string[];
  }

  getTechnologies(): string[] {
    const projects = this.initProjectsListBriefData();
    const allTechs = projects.flatMap((project) => project.technologies || []);
    return [...new Set(allTechs)];
  }

  getProjectsByStatus(
    status: 'terminé' | 'en cours' | 'maintenance'
  ): ExtendedProject[] {
    const projects = this.initProjectsListBriefData();
    return projects.filter((project) => project.status === status);
  }

  getProjectStats() {
    const projects = this.initProjectsListBriefData();
    return {
      total: projects.length,
      completed: projects.filter((p) => p.status === 'terminé').length,
      inProgress: projects.filter((p) => p.status === 'en cours').length,
      featured: projects.filter((p) => p.featured).length,
      technologies: this.getTechnologies().length,
    };
  }

  getContractSearchInfo() {
    return {
      title: "À la recherche d'un Contrat de Professionnalisation",
      subtitle: 'Développeur Full-Stack Angular/Node.js',
      description:
        'Passionné par le développement web moderne, je recherche une opportunité en Alternance pour approfondir mes compétences et contribuer à des projets innovants.',
      availability: {
        startDate: 'Immédiatement disponible',
        duration: '12-24 mois',
        mobility: 'France entière',
        remote: 'Hybride accepté',
      },
      objectives: [
        "Approfondir l'écosystème Angular et les dernières versions",
        'Maîtriser les architectures microservices',
        'Développer expertise DevOps et Cloud',
        "Contribuer à des projets d'envergure",
      ],
      advantages: [
        'Portfolio diversifié avec projets réels',
        "Autonomie et capacité d'adaptation",
        'Veille technologique constante',
        'Expérience client et gestion projet',
      ],
    };
  }

  // 🔥 CORRECTION CRITIQUE : Données complètes pour TOUS les projets
  initProjectData() {
    return (this.projectsListAllData = [
      {
        code: 'gestion-fabrique',
        image: 'img/gestion-fabrique.png',
        link: 'https://youtu.be/mwzygcyCOkM?si=UQPk8pcN14dSBSYG', // Remplace par ton vrai lien
        who: [
          {
            message:
              "<b>Application de gestion d’une fabrique</b> est une solution web conçue pour optimiser les opérations internes d'une entreprise industrielle.",
          },
        ],
        why: [
          {
            message:
              'Ce projet personnel a été développé pour répondre aux besoins concrets d’une structure de production : centraliser les données, automatiser les processus et offrir une visibilité claire sur les performances.',
          },
          {
            message:
              "L'application permet une gestion fluide des stocks, de la production, des commandes, du personnel et des indicateurs clés à travers un tableau de bord interactif.",
          },
        ],
        requirement_intro: 'Spécifications techniques et fonctionnelles :',
        requirements: [
          { message: 'Gestion des stocks en temps réel' },
          { message: 'Organisation des étapes de production' },
          { message: 'Suivi client et gestion des commandes' },
          { message: 'Gestion des rôles et du personnel' },
          { message: 'Tableau de bord avec chiffre d’affaires et indicateurs' },
          { message: 'Interface utilisateur claire et responsive' },
          { message: 'Architecture PHP / MySQL côté serveur' },
          { message: 'Technologies front-end : HTML, CSS, JavaScript' },
        ],
        estate: 'terminé',
        technologies: [
          { name: 'PHP', image: 'img/php_logo.png' },
          { name: 'JavaScript', image: 'img/javascript_logo.png' },
          { name: 'HTML5', image: 'img/html_logo.png' },
          { name: 'CSS3', image: 'img/css_logo.jpeg' },
          { name: 'MySQL', image: 'img/mysql_logo.png' },
        ],
      },

      // ✅ SSCOVID19 - Existant et fonctionnel
      {
        code: 'sscovid19',
        image: 'img/sscovid19-devices.png',
        link: 'https://sscovid19.com',
        who: [
          {
            message:
              "<b>SSCOVID19</b> est une application web innovante qui présente l'évolution en temps réel de la COVID-19 dans le monde entier.",
          },
        ],
        why: [
          {
            message:
              "Ce projet personnel ambitieux visait à participer activement à la lutte contre la pandémie en démocratisant l'accès aux données épidémiologiques fiables.",
          },
          {
            message:
              "L'application agrège et visualise les données de plus de 215 pays avec des graphiques interactifs et des analyses prédictives avancées.",
          },
        ],
        requirement_intro: 'Spécifications techniques et fonctionnelles :',
        requirements: [
          { message: 'Dashboard temps réel avec indicateurs clés mondiaux' },
          { message: 'Visualisations par continents, pays et régions' },
          { message: "Graphiques d'évolution temporelle depuis janvier 2020" },
          { message: 'Carte mondiale interactive avec gradients de risque' },
          { message: 'API REST pour données tierces' },
          { message: 'Système de cache Redis pour optimisation' },
          { message: 'Mise à jour automatique toutes les 45 minutes' },
          { message: 'Interface responsive et accessible' },
        ],
        estate: 'terminé',
        technologies: [
          { name: 'Angular 11', image: 'img/angular_logo.png' },
          { name: 'TypeScript', image: 'img/typescript_logo.png' },
          { name: 'Node.js', image: 'img/node_logo.png' },
          { name: 'Express.js', image: 'img/express_logo.png' },
          { name: 'Python', image: 'img/python_logo.jpeg' },
          { name: 'PostgreSQL', image: 'img/postgres_logo.png' },
          { name: 'AmCharts', image: 'img/amcharts_logo.png' },
          { name: 'Redis', image: 'img/redis_logo.jpeg' },
          { name: 'Docker', image: 'img/docker_logo.jpeg' },
          { name: 'Nginx', image: 'img/nginx_logo.png' },
        ],
      },

      // 🆕 RESTAURANT MANAGEMENT PRO
      {
        code: 'restaurant',
        image: 'img/restaurant.png',
        link: 'https://restaurant.sm-digitalizer.fr',
        who: [
          {
            message:
              '<b>Restaurant Management Pro</b> est une solution complète de digitalisation pour les restaurants modernes.',
          },
        ],
        why: [
          {
            message:
              "Face aux défis de la restauration moderne, cette plateforme offre une solution tout-en-un pour optimiser les opérations et améliorer l'expérience client.",
          },
          {
            message:
              'Le système intègre commandes en ligne, gestion des stocks, analytics avancés et un panel administratif complet.',
          },
        ],
        requirement_intro: 'Fonctionnalités développées :',
        requirements: [
          { message: 'Système de commande en ligne avec panier intelligent' },
          { message: 'Gestion complète des stocks et inventaires' },
          { message: "Interface d'administration avancée" },
          { message: 'Analytics et reporting en temps réel' },
          { message: 'Intégration paiement Stripe sécurisée' },
          { message: 'Notifications push et temps réel' },
          { message: 'Application PWA pour mobile' },
          { message: 'Support multilingue (FR/EN/ES)' },
        ],
        estate: 'terminé',
        technologies: [
          { name: 'Angular 12', image: 'img/angular_logo.png' },
          { name: 'PrimeNG', image: 'img/primeng_logo.png' },
          { name: 'Node.js', image: 'img/node_logo.png' },
          { name: 'MongoDB', image: 'img/mongodb_logo.png' },
          { name: 'JWT', image: 'img/jwt_logo.png' },
          { name: 'Stripe', image: 'img/stripe_logo.png' },
          { name: 'Socket.io', image: 'img/socketio_logo.png' },
          { name: 'PWA', image: 'img/pwa_logo.png' },
        ],
      },

      // 🆕 ELITES VOYAGES
      {
        code: 'elitesvoyages',
        image: 'img/ev.png',
        link: 'https://elites-voyages.com',
        who: [
          {
            message:
              "<b>Elites Voyages</b> est une plateforme moderne d'agence de voyage avec réservation intégrée.",
          },
        ],
        why: [
          {
            message:
              "Révolutionner l'expérience de réservation voyage en intégrant les APIs Amadeus pour un accès direct aux inventaires mondiaux.",
          },
          {
            message:
              'La plateforme offre une expérience utilisateur fluide avec gestion clientèle complète et backoffice administratif avancé.',
          },
        ],
        requirement_intro: 'Spécifications métier réalisées :',
        requirements: [
          { message: 'Intégration API Amadeus pour vols et hôtels' },
          { message: 'Système de réservation multi-étapes' },
          { message: 'Gestion multi-devises temps réel' },
          { message: 'CRM client intégré' },
          { message: 'Backoffice administratif complet' },
          { message: 'Système de facturation automatique' },
          { message: 'Optimisation SEO internationale' },
          { message: 'Analytics et reporting avancés' },
        ],
        estate: 'maintenance',
        technologies: [
          { name: 'Angular 12', image: 'img/angular_logo.png' },
          { name: 'PrimeNG', image: 'img/primeng_logo.png' },
          { name: 'Node.js', image: 'img/node_logo.png' },
          { name: 'MongoDB', image: 'img/mongodb_logo.png' },
          { name: 'Amadeus API', image: 'img/amadeus_logo.png' },
          { name: 'PayPal', image: 'img/paypal_logo.png' },
          { name: 'Google Analytics', image: 'img/analytics_logo.png' },
          { name: 'SEO', image: 'img/seo_logo.png' },
        ],
      },

      // 🆕 E-LEARNING PLATFORM
      {
        code: 'elearning-platform',
        image: 'img/elearning.png',
        link: 'https://demo-elearning.com',
        who: [
          {
            message:
              "<b>E-Learning Platform</b> est une solution moderne d'apprentissage à distance avec fonctionnalités avancées.",
          },
        ],
        why: [
          {
            message:
              "Créer une plateforme d'apprentissage nouvelle génération avec streaming vidéo, collaboration temps réel et suivi personnalisé.",
          },
          {
            message:
              "La solution vise à révolutionner l'éducation en ligne avec des outils interactifs et une architecture scalable.",
          },
        ],
        requirement_intro: 'Modules développés :',
        requirements: [
          { message: 'Streaming vidéo haute qualité WebRTC' },
          { message: 'Système de cours interactifs' },
          { message: 'Collaboration temps réel multi-utilisateurs' },
          { message: 'Système de notation automatique' },
          { message: 'Suivi progression personnalisé' },
          { message: 'Chat et visioconférence intégrés' },
          { message: 'Stockage cloud sécurisé AWS S3' },
          { message: 'Application mobile responsive' },
        ],
        estate: 'en cours',
        technologies: [
          { name: 'Angular 17', image: 'img/angular_logo.png' },
          { name: 'Node.js', image: 'img/node_logo.png' },
          { name: 'MongoDB', image: 'img/mongodb_logo.png' },
          { name: 'WebRTC', image: 'img/webrtc_logo.png' },
          { name: 'Socket.io', image: 'img/socketio_logo.png' },
          { name: 'FFmpeg', image: 'img/ffmpeg_logo.png' },
          { name: 'Redis', image: 'img/redis_logo.jpeg' },
          { name: 'AWS S3', image: 'img/aws_logo.png' },
        ],
      },

      // 🆕 API GATEWAY MICROSERVICES
      {
        code: 'api-gateway',
        image: 'img/microservices-architecture.png',
        link: 'https://api-docs.exemple.com',
        who: [
          {
            message:
              '<b>API Gateway Microservices</b> est une architecture enterprise scalable avec orchestration de conteneurs.',
          },
        ],
        why: [
          {
            message:
              'Développer une infrastructure microservices moderne pour supporter des applications haute disponibilité et performance.',
          },
          {
            message:
              'Cette architecture permet une scalabilité horizontale avec monitoring avancé et documentation automatique.',
          },
        ],
        requirement_intro: "Composants d'infrastructure :",
        requirements: [
          { message: 'API Gateway avec load balancing intelligent' },
          { message: 'Authentification centralisée JWT' },
          { message: 'Orchestration Kubernetes' },
          { message: 'Monitoring Prometheus + Grafana' },
          { message: 'Documentation Swagger automatique' },
          { message: 'Cache distribué Redis' },
          { message: 'Logs centralisés ELK Stack' },
          { message: 'CI/CD pipeline automatisé' },
        ],
        estate: 'terminé',
        technologies: [
          { name: 'Node.js', image: 'img/node_logo.png' },
          { name: 'Express', image: 'img/express_logo.png' },
          { name: 'Docker', image: 'img/docker_logo.jpeg' },
          { name: 'Kubernetes', image: 'img/kubernetes_logo.png' },
          { name: 'Redis', image: 'img/redis_logo.jpeg' },
          { name: 'PostgreSQL', image: 'img/postgres_logo.png' },
          { name: 'Swagger', image: 'img/swagger_logo.png' },
          { name: 'Prometheus', image: 'img/prometheus_logo.png' },
        ],
      },

      // 🆕 MOBILE FITNESS TRACKER
      {
        code: 'mobile-fitness',
        image: 'img/fitness-app.png',
        link: 'https://fitness-demo.com',
        who: [
          {
            message:
              '<b>Mobile Fitness Tracker</b> est une application mobile complète de fitness avec IA et communauté sociale.',
          },
        ],
        why: [
          {
            message:
              "Créer un compagnon fitness intelligent qui s'adapte aux utilisateurs avec des recommandations personnalisées basées sur l'IA.",
          },
          {
            message:
              "L'application vise à révolutionner le fitness mobile avec synchronisation wearables et fonctionnalités sociales.",
          },
        ],
        requirement_intro: 'Fonctionnalités mobiles :',
        requirements: [
          { message: "Programmes d'entraînement personnalisés IA" },
          { message: 'Synchronisation Apple Health / Google Fit' },
          { message: 'Suivi biométrique temps réel' },
          { message: 'Communauté sociale et défis' },
          { message: 'Notifications push intelligentes' },
          { message: 'Mode hors-ligne complet' },
          { message: 'Analytics de performance' },
          { message: 'Intégration wearables multiples' },
        ],
        estate: 'terminé',
        technologies: [
          { name: 'Ionic', image: 'img/ionic_logo.png' },
          { name: 'Angular', image: 'img/angular_logo.png' },
          { name: 'Firebase', image: 'img/firebase_logo.png' },
          { name: 'Capacitor', image: 'img/capacitor_logo.png' },
          { name: 'Health Kit', image: 'img/healthkit_logo.png' },
          { name: 'Google Fit', image: 'img/googlefit_logo.png' },
          { name: 'Push Notifications', image: 'img/push_logo.png' },
          { name: 'TensorFlow.js', image: 'img/tensorflow_logo.png' },
        ],
      },
    ]);
  }

  // ✅ Méthode corrigée avec logs de debug
  getProjectData(param: string) {
    console.log('🔍 getProjectData appelée avec:', param);

    let projectData: any;
    let projectsListAllData = this.initProjectData();

    console.log(
      '📋 Projets disponibles:',
      projectsListAllData.map((p) => p.code)
    );

    projectsListAllData.forEach((project) => {
      if (project.code == param) {
        projectData = project;
        console.log('✅ Projet trouvé:', project.code);
      }
    });

    if (!projectData) {
      console.error('❌ Aucun projet trouvé pour le code:', param);
      console.log(
        '💡 Codes disponibles:',
        projectsListAllData.map((p) => p.code)
      );
    }

    return projectData;
  }
}
