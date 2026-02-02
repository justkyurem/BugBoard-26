import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Recupera il token salvato nel login
    const token = localStorage.getItem('token');

    if (token) {
        // Se c'è un token, clona la richiesta e aggiungi l'header Authorization
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }

    // Se non c'è token, procedi normalmente
    return next(req);
};