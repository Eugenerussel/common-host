import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.backendBaseURL; // Base URL for API calls

  constructor(private http: HttpClient) {}

  getMenuData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/menu-data`);
  }
}
