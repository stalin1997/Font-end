import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Permission, Role, System, Token, User} from '../../models/auth/models.index';
import {Institution} from '../../models/app/institution';
import {MessageService} from '../app/message.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    urlAvatar: string;
    auth: User;
    institutions: Institution[];

    constructor(private httpClient: HttpClient, private router: Router, private messageService: MessageService) {
        this.urlAvatar = environment.STORAGE_URL;
    }

    removeLogin() {
        localStorage.removeItem('auth');
        localStorage.removeItem('uri');
        localStorage.removeItem('role');
        localStorage.removeItem('institution');
        localStorage.removeItem('permissions');
        localStorage.removeItem('token');
        localStorage.removeItem('keepSession');
    }

    setUrlAvatar(url: string) {
        this.urlAvatar = environment.STORAGE_URL + url;
    }

    getUrlAvatar() {
        return this.urlAvatar;
    }

    getAuth(): User {
        return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    }

    setAuth(user: User) {
        localStorage.setItem('auth', JSON.stringify(user));
    }

    getSystem(): System {
        return localStorage.getItem('system') ? JSON.parse(localStorage.getItem('system')) : null;
    }

    setSystem(system: System) {
        localStorage.setItem('system', JSON.stringify(system));
    }

    getToken(): Token {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    }

    setToken(token: Token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    setInstitution(institution) {
        localStorage.setItem('institution', JSON.stringify(institution));
    }

    getPermissions(): Permission[] {
        return localStorage.getItem('permissions') === null ? null
            : JSON.parse(localStorage.getItem('permissions')) as Permission[];
    }

    getRole(): Role {
        return localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null;
    }

    setRole(role: Role) {
        localStorage.setItem('role', JSON.stringify(role));
    }

    getInstitution(): Institution {
        return localStorage.getItem('institution') ? JSON.parse(localStorage.getItem('institution')) : null;
    }

    getUri(): string {
        return localStorage.getItem('uri') ? JSON.parse(localStorage.getItem('uri')) : null;
    }

    setUri(uri: string) {
        localStorage.setItem('uri', JSON.stringify(uri));
    }

    getKeepSession(): boolean {
        return JSON.parse(localStorage.getItem('keepSession'));
    }

    setKeepSession(keepSession) {
        localStorage.setItem('keepSession', JSON.stringify(keepSession));
    }

    verifySession() {
        if (localStorage.getItem('keepSession') === 'true') {
            this.router.navigate(['/dashboard']);
        }
    }
}
