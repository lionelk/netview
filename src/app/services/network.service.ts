import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class NetworkService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('NetworkService');
    }

    saveNetworkModel(modelText: string) {
        console.log('model Json : ' + modelText);

        return this.http.post<any>(`${environment.apiUrl}/networkview/save`, modelText)
            .pipe(
                catchError(this.handleError('saveNetworkModel', modelText))
            );
    }
}
