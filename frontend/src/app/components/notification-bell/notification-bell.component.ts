import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

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

    constructor(
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCount();
        // Polling ogni 30 secondi
        this.pollSub = interval(30000).pipe(
            switchMap(() => this.notificationService.getUnreadCount().pipe(
                catchError(() => of({ count: 0 }))
            ))
        ).subscribe(res => this.unreadCount = res.count);
    }

    loadCount(): void {
        this.notificationService.getUnreadCount().pipe(
            catchError(() => of({ count: 0 }))
        ).subscribe(res => {
            this.unreadCount = res.count;
        });
    }

    goToNotifications(): void {
        this.router.navigate(['/notifications']);
    }

    ngOnDestroy(): void {
        this.pollSub?.unsubscribe();
    }
}
