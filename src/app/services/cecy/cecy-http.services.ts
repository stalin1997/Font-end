import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment, WEB} from '../../../environments/environment';
import {MessageService} from '../app/message.service';
import { File } from 'src/app/models/app/file';


@Injectable({
    providedIn: 'root'
})

export class CecyHttpService {
    API_URL_CECY: string = environment.API_URL_CECY;

    constructor(private httpClient: HttpClient,
        private router: Router,
        private messageService: MessageService) {
    }


    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_CECY + url;
        return this.httpClient.get(url, {params});
    }
    
    store(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.put(url, data, {params});
    }

    
    

    /* post(url: string, data: any, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.post(url, data, {params});
    } */
    

    

    delete(url: string, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.delete(url, {params});
    }
    updateFile(file: File, params = new HttpParams()) {
        const url = environment.API_URL_CECY + 'file/update/' + file.id;
        return this.httpClient.put(url, file, {params});
    }


    downloadFiles(params = new HttpParams()) {
        const url = environment.API_URL_CECY + 'file/download';
        return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
    }

    deleteFiles(ids, params = new HttpParams()) {
        const url = environment.API_URL_CECY + 'file/delete';
        return this.httpClient.put(url, {ids}, {params});
    }

    uploadFiles(url, data: FormData, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.post(url, data, {params});
    }

    getFiles(url, params = new HttpParams()) {
        url = this.API_URL_CECY + url;
        return this.httpClient.get(url, {params});
    }


}
