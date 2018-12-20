import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    private isUserLoggedIn = false;
    private currentUser: string;
    private currentHostName: string;

    public setLoggedInUser(flag, user, host) {
    console.log('setLoggedInUser');
    this.isUserLoggedIn = flag;
    this.currentUser = user;
    this.currentHostName = host;
    }


public getCurrentUser(): string {
    return this.currentUser;
}
public getCurrentHostname(): string {
    return this.currentHostName;
}

public getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
    }
}
