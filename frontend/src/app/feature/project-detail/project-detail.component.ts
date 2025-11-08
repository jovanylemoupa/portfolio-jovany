import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: any;
  private keyDownHandler: (event: KeyboardEvent) => void;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    // Bind de la méthode pour pouvoir la supprimer correctement
    this.keyDownHandler = this.handleKeyDown.bind(this);
  }

  ngOnInit(): void {
    this.getProjectData();

    // Debug des données reçues
    console.log('🎭 ProjectDetailComponent - Données reçues:', this.project);

    // Désactiver l'auto-focus du dialog pour éviter les conflits
    setTimeout(() => {
      const dialogElement = document.querySelector('.p-dialog');
      if (dialogElement) {
        dialogElement.setAttribute('data-p-hidden-focusable', 'true');
      }

      // Ajouter support pour la touche Escape
      document.addEventListener('keydown', this.keyDownHandler);
    }, 150);
  }

  ngOnDestroy(): void {
    // Nettoyer l'event listener
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  /**
   * Récupère les données du projet depuis la configuration du dialog
   */
  getProjectData() {
    this.project = this.config.data?.projectData;

    if (!this.project) {
      console.error('❌ Aucune donnée de projet reçue');
      return;
    }

    // Assurer la compatibilité entre ancienne et nouvelle structure
    this.ensureCompatibility();
  }

  /**
   * 🔄 Assure la compatibilité entre les différentes structures de données
   */
  private ensureCompatibility() {
    if (!this.project) return;

    // Si c'est l'ancienne structure (from projectsService.getProjectData), on garde tel quel
    if (this.project.who || this.project.why || this.project.requirements) {
      console.log('📄 Utilisation structure complète (legacy)');
      return;
    }

    // Si c'est la nouvelle structure (from initProjectsListBriefData), on adapte
    if (this.project.projectTitle || this.project.description) {
      console.log('🆕 Adaptation vers structure legacy');

      const adapted = {
        code: this.project.projectCode,
        image: this.project.projectImage || 'img/default-project.png',
        link: this.project.demoUrl || this.project.liveUrl,
        estate: this.project.status || 'en cours',

        // Adaptation des sections description
        who: this.project.projectTitle
          ? [
              {
                message: `<b>${this.project.projectTitle}</b> - ${
                  this.project.projectSummary || this.project.description || ''
                }`,
              },
            ]
          : [],

        why: this.project.description
          ? [
              {
                message: this.project.description,
              },
            ]
          : [],

        requirements: this.project.features
          ? this.project.features.map((feature: string) => ({
              message: feature,
            }))
          : this.project.challenges
          ? this.project.challenges.map((challenge: string) => ({
              message: challenge,
            }))
          : [],

        requirement_intro: this.project.features
          ? 'Fonctionnalités principales :'
          : this.project.challenges
          ? 'Défis techniques :'
          : '',

        // Technologies
        technologies: this.project.technologies
          ? this.project.technologies.map((tech: string) => ({
              name: tech,
              image: `img/${tech
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')}_logo.png`,
            }))
          : [],
      };

      this.project = adapted;
      console.log('✅ Structure adaptée:', this.project);
    }
  }

  /**
   * Ouvre le site web du projet dans un nouvel onglet
   * @param link - URL du site web
   */
  goOnSscovidWebsite(link: string) {
    if (link) {
      console.log('🔗 Ouverture du lien:', link);
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('⚠️ Aucun lien disponible pour ce projet');
    }
  }

  /**
   * Ferme le dialog
   */
  closeDialog(): void {
    console.log('🔚 Fermeture du modal projet');
    this.ref.close();
  }

  /**
   * Gère les raccourcis clavier (Escape pour fermer)
   * @param event - Événement clavier
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDialog();
    }
  }

  /**
   * Obtient l'icône appropriée pour l'état du projet
   * @param estate - État du projet
   * @returns Classe d'icône PrimeNG
   */
  getEstateIcon(estate: string): string {
    if (!estate) return 'pi pi-info-circle';

    switch (estate.toLowerCase()) {
      case 'terminé':
      case 'completed':
      case 'done':
        return 'pi pi-check-circle';
      case 'en cours':
      case 'en-cours':
      case 'in-progress':
      case 'progress':
        return 'pi pi-clock';
      case 'maintenance':
        return 'pi pi-wrench';
      case 'planifié':
      case 'planifie':
      case 'planned':
        return 'pi pi-calendar';
      case 'en développement':
      case 'développement':
      case 'development':
        return 'pi pi-code';
      case 'test':
      case 'testing':
        return 'pi pi-cog';
      case 'paused':
      case 'pausé':
        return 'pi pi-pause';
      default:
        return 'pi pi-info-circle';
    }
  }

  /**
   * Vérifie si le projet est terminé
   * @returns true si le projet est terminé
   */
  isProjectCompleted(): boolean {
    const estate = this.project?.estate?.toLowerCase();
    return estate === 'terminé' || estate === 'completed' || estate === 'done';
  }

  /**
   * Obtient le texte formaté pour l'état
   * @param estate - État du projet
   * @returns État formaté
   */
  getFormattedEstate(estate: string): string {
    if (!estate) return 'Non défini';

    // Mapping des états en français
    const stateMapping: { [key: string]: string } = {
      terminé: 'Terminé',
      completed: 'Terminé',
      done: 'Terminé',
      'en cours': 'En cours',
      'en-cours': 'En cours',
      'in-progress': 'En cours',
      progress: 'En cours',
      maintenance: 'En maintenance',
      planifié: 'Planifié',
      planifie: 'Planifié',
      planned: 'Planifié',
      development: 'En développement',
      développement: 'En développement',
      test: 'En test',
      testing: 'En test',
      paused: 'En pause',
      pausé: 'En pause',
    };

    return (
      stateMapping[estate.toLowerCase()] ||
      estate.charAt(0).toUpperCase() + estate.slice(1).toLowerCase()
    );
  }

  /**
   * 🆕 Vérifie si le projet a des données de technologies
   */
  hasTechnologies(): boolean {
    return this.project?.technologies && this.project.technologies.length > 0;
  }

  /**
   * 🆕 Vérifie si le projet a des exigences/features
   */
  hasRequirements(): boolean {
    return this.project?.requirements && this.project.requirements.length > 0;
  }

  /**
   * 🆕 Vérifie si le projet a une description "pourquoi"
   */
  hasWhy(): boolean {
    return this.project?.why && this.project.why.length > 0;
  }

  /**
   * 🆕 Vérifie si le projet a une description "pour qui"
   */
  hasWho(): boolean {
    return this.project?.who && this.project.who.length > 0;
  }

  /**
   * 🆕 Obtient l'URL de l'image avec fallback
   */
  getProjectImage(): string {
    return this.project?.image || 'img/default-project.png';
  }

  /**
   * 🆕 Obtient le titre du projet
   */
  getProjectTitle(): string {
    return (
      this.project?.projectTitle ||
      this.project?.title ||
      this.project?.name ||
      'Projet'
    );
  }

  /**
   * 🆕 Vérifie si on peut visiter le projet
   */
  canVisitProject(): boolean {
    return this.isProjectCompleted() && !!this.project?.link;
  }

  /**
   * 🆕 Gestion d'erreur pour les images
   */
  onImageError(event: any) {
    console.warn('⚠️ Erreur chargement image:', event.target.src);
    event.target.src = 'img/default-project.png';
  }

  /**
   * 🆕 Debug du projet (à supprimer en production)
   */
  debugProject() {
    console.group('🔍 DEBUG PROJET');
    console.log('Données brutes:', this.project);
    console.log('A des technologies:', this.hasTechnologies());
    console.log('A des exigences:', this.hasRequirements());
    console.log('Peut être visité:', this.canVisitProject());
    console.log('État formaté:', this.getFormattedEstate(this.project?.estate));
    console.groupEnd();
  }
}
