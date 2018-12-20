import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log('login : ' + username + ' password : ' + password);

      //  return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { 'username': username, 'password': password})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log('login ok. check user and token');
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log('currentUser set to ' + JSON.stringify(user));
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}