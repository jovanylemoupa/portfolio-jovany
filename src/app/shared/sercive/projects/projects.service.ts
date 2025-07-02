import { Injectable } from '@angular/core';
import { Project } from '../../model/project';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectsListBriefData!: Project[];
  projectsListAllData: any[] = [];

  constructor() {}

  initProjectsListBriefData(): Project[] {
    return (this.projectsListBriefData = [
      {
        projectTitle: 'Sscovid19',
        projectImage: '../../../assets/img/projects/sscovid19.png',
        projectSummary:
          "Réalisation d'une application web qui permet de suivre l'évolution de l'épidémie de la covid-19 dans le monde",
        projectImageAltAttribute: 'miniature du site web sscovid19',
        projectCode: 'sscovid19',
      },

      {
        projectTitle: 'Restaurant',
        projectImage: '../../../assets/img/projects/restaurant.png',
        projectSummary:
          "Réalisation d'un template de site web idéal pour un restaurant avec un système de prise de commande en ligne",
        projectImageAltAttribute: 'miniature du site web casabreizh',
        projectCode: 'restaurant',
      },

      {
        projectTitle: 'Elites Voyages',
        projectImage: '../../../assets/img/projects/ev.png',
        projectSummary:
          "Réalisation du site web d'Elites Voyages, agence de voyage, de tourisme, de transport et de logistique",
        projectImageAltAttribute: 'miniature du site web elites voyages',
        projectCode: 'elitesvoyages',
      },

      {
        projectTitle: 'Élections',
        projectImage: '../../../assets/img/projects/fecabasket-campain.png',
        projectSummary:
          "Réalisation du site web de campagne pour la présidence d'une organisation sportive de basketball",
        projectImageAltAttribute: 'Projet du candidat à la présidence',
        projectCode: 'fecabasketcampain',
      },

      {
        projectTitle: 'FOR YOU MEDIA',
        projectImage:
          '../../../assets/img/projects/foryou-media-afrique-logo.png',
        projectSummary:
          "Réalisation de l'application web de la chaine de télévision et chaine de radio internationale ForYou Media Africa",
        projectImageAltAttribute:
          'logo de la chaine de télé foryou media africa',
        projectCode: 'foryoumedias',
      },
    ]);
  }

  initProjectData() {
    return (this.projectsListAllData = [
      {
        code: 'sscovid19',
        image: '../../../assets/img/projects/sscovid19-devices.png',
        link: 'https://sscovid19.com',
        who: [
          {
            message:
              "<b>SSCOVID19</b> est une application web qui présente l'état d'évolution de la covid-19 dans le monde.",
          },
        ],
        why: [
          {
            message:
              "C'est un projet personnel que j'ai réalisé dans le but de participer activement dans la lutte contre la covid en permettant à quiconque de consulter les chiffres clés de la pandémie. ",
          },
          {
            message:
              'Il prend en compte les données de plus de 215 pays et les affiche via des graphes et des tableaux représentants les chiffres enregistrés par pays et par continent.',
          },
        ],
        requirement_intro: 'Quelles sont les spécifités de ce projet ?',
        requirements: [
          {
            message: 'présentation des chiffres mondiaux de la pandémie ',
          },
          {
            message: 'présentation des chiffres par continents et par pays',
          },
          {
            message:
              "visualisation de l'évolution de la maladie et d'évolution des vaccinations ( depuis janvier 2020 ) via des graphes",
          },
          {
            message:
              'présentation de la carte du monde avec des indicateurs de couleur suivant la gravité des cas dans différents pays',
          },
          {
            message: 'Mise à jour des bases de données toutes les 45 minutes',
          },
        ],

        estate: 'terminé',

        technologies: [
          {
            name: 'Angular 11',
            image: '../../../assets/img/logos/angular_logo.png',
          },
          {
            name: 'Node js',
            image: '../../../assets/img/logos/node_logo.png',
          },
          {
            name: 'Express js',
            image: '../../../assets/img/logos/express_logo.png',
          },
          {
            name: 'PostgreSQL',
            image: '../../../assets/img/logos/postgres_logo.png',
          },
          {
            name: 'AmCharts',
            image: '../../../assets/img/logos/amcharts_logo.png',
          },
          {
            name: 'Google Analytics',
            image: '../../../assets/img/logos/google_analytics_logo.png',
          },
          {
            name: 'o2Switch',
            image: '../../../assets/img/logos/o2switch_logo.png',
          },
          {
            name: 'Github',
            image: '../../../assets/img/logos/github.png',
          },
        ],
      },
      {
        code: 'restaurant',
        image: '../../../assets/img/projects/restaurant-responsive.png',
        link: 'https://restaurant.sm-digitalizer.fr',
        who: [
          {
            message:
              'Je me suis proposé de réaliser un système complet de gestion de site web de restaurant.',
          },
        ],
        why: [
          {
            message:
              "J'ai cherché au travers de ce projet à créer un excellent outil à destinantion des restaurants leurs permettant de présenter des plats et services proposés tout en optimisant la prise de commande client. Les commandes sont passées directement sur le site web par le client et le restaurant les reçoit directement par mail et aussi dans la partie admin sécurisée. Cette partie admin permet aussi de gérer les produits pésentés sur le site web.",
          },
        ],
        estate: 'terminé',

        technologies: [
          {
            name: 'Angular 12',
            image: '../../../assets/img/logos/angular_logo.png',
          },
          {
            name: 'Prime ng',
            image: '../../../assets/img/logos/primeng_logo.png',
          },
          {
            name: 'Sass',
            image: '../../../assets/img/logos/scss_logo.png',
          },
          {
            name: 'Node js',
            image: '../../../assets/img/logos/node_logo.png',
          },
          {
            name: 'Express js',
            image: '../../../assets/img/logos/express_logo.png',
          },
          {
            name: 'MongoDB Atlas',
            image: '../../../assets/img/logos/mongodb_logo.png',
          },
          {
            name: 'JWT',
            image: '../../../assets/img/logos/json_web_token_logo.png',
          },
          {
            name: 'o2switch',
            image: '../../../assets/img/logos/o2switch_logo.png',
          },
          {
            name: 'Adobe XD',
            image: '../../../assets/img/logos/adobe_logo.png',
          },
          {
            name: 'Github',
            image: '../../../assets/img/logos/github.png',
          },
        ],
      },
      {
        code: 'elitesvoyages',
        image: '../../../assets/img/projects/ev-responsive.png',
        link: 'https://elites-voyages.com',
        who: [
          {
            message:
              '<b>ELITES VOYAGES</b>  est une agence de voyage et de tourisme située au Cameroun.',
          },
        ],
        why: [
          {
            message:
              "Voulant se rapprocher d'avantage de sa clientèle grandissante, elle a décidé de se doter d'un site web lui permettant de fournir un service de qualité aux clients. ",
          },
          {
            message:
              "Après un ensemble de réunions au bouts desquelles je leur ai présenté le design du site web et les interfaces utilisateurs de la solution que je proposais, nous sommes tombés d'accord. Étant donné qu'elle ne possedait pas d'ancienne solution , j'ai dû tout créer de rien y compris le logo.",
          },
        ],
        requirement_intro:
          'Les exigences de ce site web étaient les suivantes: ',
        requirements: [
          {
            message: 'achat du nom de domaine',
          },
          {
            message: 'création du logo',
          },
          {
            message: "création d'adresses mails professionnelles",
          },
          {
            message:
              "présentation des services de l'entreprise via des design de qualité",
          },
          {
            message:
              "création de différents formulaires d'accès aux services (Réservation de billet d'avions, hôtel, appartements meublé, location voiture, expédition DHL, ...) ",
          },
          {
            message:
              'présentation des services proposés par des entreprises partenanires',
          },
          {
            message:
              "création d'une partie administrateur sécurisée destinée à la gestion et mise à jour du site web ( gestion de tourisme, gestion des hébergements (appartements meublés et hôtels), dashboard de l'activité de l'entreprise, ...",
          },

          {
            message: 'optimisation du SEO',
          },
          {
            message:
              'intégration de fonctionnalités de suivi du parcours utilisateurs sur le site',
          },
          {
            message: "Intégration d'une adaptation de prix suivant les dévises",
          },
          {
            message:
              "Formation des équipes pour l'utilisation de la partie admin",
          },
          {
            message: 'Mise en ligne du site web',
          },
        ],

        estate: 'terminé',

        technologies: [
          {
            name: 'Angular 12',
            image: '../../../assets/img/logos/angular_logo.png',
          },
          {
            name: 'Prime ng',
            image: '../../../assets/img/logos/primeng_logo.png',
          },
          {
            name: 'Sass',
            image: '../../../assets/img/logos/scss_logo.png',
          },
          {
            name: 'Node js',
            image: '../../../assets/img/logos/node_logo.png',
          },
          {
            name: 'Express js',
            image: '../../../assets/img/logos/express_logo.png',
          },
          {
            name: 'MongoDB',
            image: '../../../assets/img/logos/mongodb_logo.png',
          },
          {
            name: 'JWT',
            image: '../../../assets/img/logos/json_web_token_logo.png',
          },
          {
            name: 'Amadeus API',
            image: '../../../assets/img/logos/amadeus.png',
          },
          {
            name: 'Microanalytics.io',
            image: '../../../assets/img/logos/microanalytics.png',
          },
          {
            name: 'o2switch',
            image: '../../../assets/img/logos/o2switch_logo.png',
          },
          {
            name: 'Adobe XD',
            image: '../../../assets/img/logos/adobe_logo.png',
          },
          {
            name: 'Github',
            image: '../../../assets/img/logos/github.png',
          },
        ],
      },
      {
        code: 'fecabasketcampain',
        image: '../../../assets/img/projects/yves-tsala-devices.png',
        link: 'https://root.yvestsala2022.com',
        who: [
          {
            message:
              "Le directeur de campagne du candidat Yves Tsala, candidat aux éléctions 2022 pour la présidence de la Fédération camerounaise de basket-ball ( FECABASKET )  m'a contacté pour un besoin de création, suivi et maintient du site web de campagne de son candidat.",
          },
        ],
        why: [
          {
            message:
              'Le besoin manifesté a été de créer un outil de communication de qualité permettant de présenter sa vision et son projet pour le basketball camerounais. ',
          },
        ],
        requirement_intro: 'Les exigences de ce projet sont les suivantes: ',
        requirements: [
          {
            message:
              'réaliser les maquettes du site web permettant au candidat de se présenter, présenter son QG de campagne, sa vision et son projet de la façon la plus optimale possible',
          },
          {
            message: 'rendre le site web consultable sur tous types de devices',
          },
          {
            message:
              'créer des bouttons de partage avec un contenu pré-construit à destination des différents réseaux sociaux',
          },
          {
            message:
              'rediriger les utilisateurs vers les plateformes de réceptions de dons créées pour soutenir la campagne',
          },
          {
            message:
              "créer une partie administrateur sécurisée qui permet de mettre à jour le calendrier d'évènements de campagne visible sur le site web",
          },
        ],

        estate: 'terminé',

        technologies: [
          {
            name: 'Angular 13',
            image: '../../../assets/img/logos/angular_logo.png',
          },
          {
            name: 'Prime ng',
            image: '../../../assets/img/logos/primeng_logo.png',
          },
          {
            name: 'Node js',
            image: '../../../assets/img/logos/node_logo.png',
          },
          {
            name: 'Express js',
            image: '../../../assets/img/logos/express_logo.png',
          },
          {
            name: 'MongoDB Atlas',
            image: '../../../assets/img/logos/mongodb_logo.png',
          },
          {
            name: 'passport js',
            image: '../../../assets/img/logos/passportjs.png',
          },
          {
            name: 'o2switch',
            image: '../../../assets/img/logos/o2switch_logo.png',
          },
          {
            name: 'Adobe XD',
            image: '../../../assets/img/logos/adobe_logo.png',
          },
          {
            name: 'Github',
            image: '../../../assets/img/logos/github.png',
          },
        ],
      },
      {
        code: 'foryoumedias',
        image: '../../../assets/img/projects/foryou-media-afrique-logo.png',
        link: '',
        who: [
          {
            message:
              '<b>For You Media Africa</b> est une chaîne de télévision et de radio panafricaine basée au Cameroun à Douala.</b>',
          },
        ],
        why: [
          {
            message:
              "La chaine possédait déjà un premier site web mais ce dernier ne répondait plus à ses exigences. Aussi, la chaine a souhaité rajouter de nouvelles fonctionnalités mais il s'est posé de nombreux problèmes d'implémentation provenant du mauvais choix de technologies. Après une analyse de l'existant, j'ai proposé des maquettes qui ont été validées et ensuite s'est suivi la phase de réalisation.",
          },
        ],
        requirement_intro: 'Les exigences de ce projet sont les suivantes: ',
        requirements: [
          {
            message: 'achat du nouveau nom de domaine',
          },
          {
            message: "création d'adresses mails professionnelles",
          },
          {
            message: 'design des maquettes et développement',
          },
          {
            message:
              "implémentation de la réception de dons à l'endroit de la chaine. Dons reçu par paypal et virements bancaires",
          },
          {
            message:
              "création d'une partie administrateur sécurisée qui permet de gérer et de mettre à jour l'application web à destination du publique ( céation et mise à jour des types d'émissions, programmes, replay ... )",
          },
          {
            message: 'mise en production de la partie admin et publique',
          },
          {
            message: 'maintenance et rajout de fonctionnalités',
          },
        ],

        estate: 'en cours',

        technologies: [
          {
            name: 'Angular 13',
            image: '../../../assets/img/logos/angular_logo.png',
          },
          {
            name: 'Prime ng',
            image: '../../../assets/img/logos/primeng_logo.png',
          },
          {
            name: 'Node js',
            image: '../../../assets/img/logos/node_logo.png',
          },
          {
            name: 'Express js',
            image: '../../../assets/img/logos/express_logo.png',
          },
          {
            name: 'MongoDB',
            image: '../../../assets/img/logos/mongodb_logo.png',
          },
          {
            name: 'passport js',
            image: '../../../assets/img/logos/passportjs.png',
          },
          {
            name: 'Google Analytics',
            image: '../../../assets/img/logos/google_analytics_logo.png',
          },
          {
            name: 'o2switch',
            image: '../../../assets/img/logos/o2switch_logo.png',
          },
          {
            name: 'Adobe XD',
            image: '../../../assets/img/logos/adobe_logo.png',
          },
          {
            name: 'Github',
            image: '../../../assets/img/logos/github.png',
          },
        ],
      },
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
