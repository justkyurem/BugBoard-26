import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription, of, fromEvent } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-notification-bell',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './notification-bell.component.html',
    styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
    unreadCount = 0;
    private pollSub: Subscription | null = null;
    private updateSub: Subscription | null = null;
    private routeSub: Subscription | null = null;
    private focusSub: Subscription | null = null;
    private visibilitySub: Subscription | null = null;

    constructor(
        private notificationService: NotificationService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadCount();

        // Ascolta gli eventi di aggiornamento dal servizio per aggiornare il counter immediatamente
        this.updateSub = this.notificationService.notificationsUpdated$.subscribe(() => {
            this.loadCount();
        });

        this.routeSub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.loadCount();
            }
        });

        // Polling frequente per aggiornamento quasi real-time
        this.pollSub = interval(5000).pipe(
            switchMap(() => this.notificationService.getUnreadCount().pipe(
                catchError(() => of({ count: 0 }))
            ))
        ).subscribe(res => {
            this.unreadCount = res.count;
            this.cdr.detectChanges();
        });

        // Aggiorna quando l'utente torna nella tab/finestra
        this.focusSub = fromEvent(window, 'focus').subscribe(() => this.loadCount());
        this.visibilitySub = fromEvent(document, 'visibilitychange').subscribe(() => {
            if (!document.hidden) this.loadCount();
        });
    }

    loadCount(): void {
        this.notificationService.getUnreadCount().pipe(
            catchError(() => of({ count: 0 }))
        ).subscribe(res => {
            this.unreadCount = res.count;
            this.cdr.detectChanges();
        });
    }

    goToNotifications(): void {
        this.router.navigate(['/notifications']);
    }

    ngOnDestroy(): void {
        if (this.pollSub) this.pollSub.unsubscribe();
        if (this.updateSub) this.updateSub.unsubscribe();
        if (this.routeSub) this.routeSub.unsubscribe();
        if (this.focusSub) this.focusSub.unsubscribe();
        if (this.visibilitySub) this.visibilitySub.unsubscribe();
    }
}
