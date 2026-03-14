import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { ConfirmModal } from '../confirm-modal/confirm-modal';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, ConfirmModal],
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: Notification[] = [];
    showConfirmDelete: boolean = false;

    constructor(
        private notificationService: NotificationService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadNotifications();
    }

    ngOnDestroy(): void {
        // Quando l'utente lascia la pagina, eliminiamo tutte le notifiche lette
        const readNotifications = this.notifications.filter(n => n.read);
        if (readNotifications.length > 0) {
            readNotifications.forEach(n => {
                this.notificationService.deleteNotification(n.id).subscribe();
            });
        }
    }

    loadNotifications(): void {
        this.notificationService.getMyNotifications().subscribe(data => {
            this.notifications = data;
            this.cdr.detectChanges();
        });
    }

    markAsRead(notification: Notification): void {
        if (!notification.read) {
            this.notificationService.markAsRead(notification.id).subscribe({
                next: () => {
                    notification.read = true;
                    // Naviga all'issue collegata SOLO DOPO che l'API ha finito
                    this.router.navigate(['/issue', notification.issueId]);
                },
                error: (err) => {
                    console.error('Errore durante la lettura della notifica:', err);
                    // Naviga comunque in caso di errore per non bloccare l'utente
                    this.router.navigate(['/issue', notification.issueId]);
                }
            });
        } else {
            // Se è già letta, naviga direttamente
            this.router.navigate(['/issue', notification.issueId]);
        }
    }

    get hasUnread(): boolean {
        return this.notifications.some(n => !n.read);
    }

    markAllAsRead(): void {
        this.notificationService.markAllAsRead().subscribe(() => {
            this.notifications.forEach(n => n.read = true);
            this.cdr.detectChanges(); // Forza aggiornamento della UI
        });
    }

    // Apre il modal di conferma per l'eliminazione
    promptDeleteAll(): void {
        this.showConfirmDelete = true;
    }

    // Esegue effettivamente l'eliminazione dopo la conferma dal modal
    confirmDeleteAll(): void {
        this.notificationService.deleteAllMyNotifications().subscribe({
            next: () => {
                this.notifications = []; // Svuota l'array localmente
                this.showConfirmDelete = false; // Chiudi il modal
                this.cdr.detectChanges(); // Forza aggiornamento per riflettere lo svuotamento
            },
            error: (err) => {
                console.error('Errore durante l\'eliminazione di tutte le notifiche:', err);
                this.showConfirmDelete = false;
            }
        });
    }

    // Annulla l'eliminazione dal modal
    cancelDeleteAll(): void {
        this.showConfirmDelete = false;
    }

    goBack(): void {
        this.router.navigate(['/issue-board']);
    }
}
