import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";

export const AdminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
        router.navigate(['/login']);
        return false;
    }

    try {
        // Decodifica JWT (payload è la parte centrale)
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Controlla se il ruolo è ADMIN
        if (payload.role === 'ADMIN') {
            return true;
        } else {
            alert('Accesso negato: solo gli amministratori possono accedere a questa pagina.');
            router.navigate(['/issue-board']);
            return false;
        }
    } catch (error) {
        console.error('Token non valido:', error);
        router.navigate(['/login']);
        return false;
    }
};