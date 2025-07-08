import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getProjectData();

    // Désactiver l'auto-focus du dialog pour éviter les conflits
    setTimeout(() => {
      const dialogElement = document.querySelector('.p-dialog');
      if (dialogElement) {
        dialogElement.setAttribute('data-p-hidden-focusable', 'true');
      }

      // Ajouter support pour la touche Escape
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }, 150);
  }

  ngOnDestroy(): void {
    // Nettoyer l'event listener
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  /**
   * Récupère les données du projet depuis la configuration du dialog
   */
  getProjectData() {
    this.project = this.config.data.projectData;
  }

  /**
   * Ouvre le site web du projet dans un nouvel onglet
   * @param link - URL du site web
   */
  goOnSscovidWebsite(link: string) {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Ferme le dialog
   */
  closeDialog(): void {
    this.ref.close();
  }

  /**
   * Gère les raccourcis clavier (Escape pour fermer)
   * @param event - Événement clavier
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
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
        return 'pi pi-check-circle';
      case 'en cours':
      case 'en-cours':
        return 'pi pi-clock';
      case 'planifié':
      case 'planifie':
        return 'pi pi-calendar';
      case 'en développement':
      case 'développement':
        return 'pi pi-code';
      case 'test':
      case 'testing':
        return 'pi pi-cog';
      default:
        return 'pi pi-info-circle';
    }
  }

  /**
   * Vérifie si le projet est terminé
   * @returns true si le projet est terminé
   */
  isProjectCompleted(): boolean {
    return this.project?.estate?.toLowerCase() === 'terminé';
  }

  /**
   * Obtient le texte formaté pour l'état
   * @param estate - État du projet
   * @returns État formaté
   */
  getFormattedEstate(estate: string): string {
    if (!estate) return '';

    // Capitaliser la première lettre et gérer les accents
    return estate.charAt(0).toUpperCase() + estate.slice(1).toLowerCase();
  }
}
