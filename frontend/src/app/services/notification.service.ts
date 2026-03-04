import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://localhost:8080/api/notifications';

    constructor(private http: HttpClient) { }

    // Recupera tutte le notifiche dell'utente loggato
    getMyNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/me`);
    }

    // Recupera il numero di notifiche non lette
    getUnreadCount(): Observable<{ count: number }> {
        return this.http.get<{ count: number }>(`${this.apiUrl}/me/unread-count`);
    }

    // Segna una notifica come letta
    markAsRead(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/read`, {});
    }

    // Segna tutte come lette
    markAllAsRead(): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/me/read-all`, {});
    }
}
