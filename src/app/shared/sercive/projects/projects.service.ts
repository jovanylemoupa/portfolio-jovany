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
        projectImage: 'img/elearning.jpg',
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
        projectImage: 'img/api-gateway.jpg',
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
        projectTitle: 'Mobile Fitness Tracker',
        projectImage: 'img/fitness-app.jpg',
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

  // Méthodes utilitaires existantes améliorées
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

  // Nouvelles méthodes pour les statistiques
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

  // Méthode pour la recherche de contrat
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

  // Données existantes étendues
  initProjectData() {
    return (this.projectsListAllData = [
      // Vos données existantes avec ajouts...
      {
        code: 'sscovid19',
        image: 'img/projects/sscovid19-devices.png',
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
          {
            name: 'Angular 11',
            image: 'img/angular_logo.png',
          },
          {
            name: 'TypeScript',
            image: 'img/typescript_logo.png',
          },
          { name: 'Node.js', image: 'img/node_logo.png' },
          {
            name: 'Express.js',
            image: 'img/express_logo.png',
          },
          {
            name: 'Python',
            image: 'img/python_logo.png',
          },
          {
            name: 'PostgreSQL',
            image: 'img/postgres_logo.png',
          },
          {
            name: 'AmCharts',
            image: 'img/amcharts_logo.png',
          },
          { name: 'Redis', image: 'img/redis_logo.png' },
          {
            name: 'Docker',
            image: 'img/docker_logo.png',
          },
          { name: 'Nginx', image: 'img/nginx_logo.png' },
        ],
      },
      // Ajoutez vos autres projets ici avec la même structure étendue...
    ]);
  }

  getProjectData(param: string) {
    let projectData: any;
    let projectsListAllData = this.initProjectData();

    projectsListAllData.forEach((project) => {
      if (project.code == param) {
        projectData = project;
      }
    });

    return projectData;
  }
}
