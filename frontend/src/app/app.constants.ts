// L'URL viene iniettato a build-time tramite ARG Docker (o ng serve in locale)
// In locale senza Docker: ng serve → http://localhost:4200 → proxied a 8080
// In Docker locale: build con API_URL=http://localhost:8080/api
// In Render/produzione: build con API_URL=https://bugboard-26.onrender.com/api
declare const __API_BASE_URL__: string;
export const API_BASE_URL: string = (typeof __API_BASE_URL__ !== 'undefined' && __API_BASE_URL__ !== '')
    ? __API_BASE_URL__
    : 'http://localhost:8080/api';
