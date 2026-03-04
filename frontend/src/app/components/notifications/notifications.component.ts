import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    notifications: Notification[] = [];

    constructor(
        private notificationService: NotificationService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadNotifications();
    }

    loadNotifications(): void {
        this.notificationService.getMyNotifications().subscribe(data => {
            this.notifications = data;
            this.cdr.detectChanges();
        });
    }

    markAsRead(notification: Notification): void {
        if (!notification.read) {
            this.notificationService.markAsRead(notification.id).subscribe(() => {
                notification.read = true;
            });
        }
        // Naviga all'issue collegata
        this.router.navigate(['/issue', notification.issueId]);
    }

    markAllAsRead(): void {
        this.notificationService.markAllAsRead().subscribe(() => {
            this.notifications.forEach(n => n.read = true);
        });
    }
}
