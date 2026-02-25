import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';
@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private apiUrl = 'http://localhost:8080/api/issues';
    constructor(private http: HttpClient) { }
    // GET /api/issues
    getAllIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(this.apiUrl);
    }
    getIssuesFiltered(filters: any): Observable<Issue[]> {
        let params = new HttpParams();
        if (filters.status) params = params.set('status', filters.status);
        if (filters.priority) params = params.set('priority', filters.priority);
        if (filters.type) params = params.set('type', filters.type);
        return this.http.get<Issue[]>(this.apiUrl, { params });
    }
    // GET /api/issues/{id}
    getIssueById(id: number): Observable<Issue> {
        return this.http.get<Issue>(`${this.apiUrl}/${id}`);
    }
    // POST /api/issues
    createIssue(issue: Issue): Observable<Issue> {
        return this.http.post<Issue>(this.apiUrl, issue);
    }
    // POST /api/files
    uploadImage(file: File): Observable<{ imageUrl: string }> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<{ imageUrl: string }>('http://localhost:8080/api/files', formData);
    }
    // PUT /api/issues/{id}
    updateIssue(id: number, issue: Issue): Observable<Issue> {
        return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
    }
    // DELETE /api/issues/{id}
    deleteIssue(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    // GET /api/issues/search?keyword=...
    searchIssues(keyword: string): Observable<Issue[]> {
        return this.http.get<Issue[]>(`${this.apiUrl}/search?keyword=${keyword}`);
    }
}