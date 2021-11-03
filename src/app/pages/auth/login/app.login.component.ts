import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';
import {Role, System, User} from '../../../models/auth/models.index';
import {Institution} from '../../../models/app/institution';
import swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';
import {MessageService} from '../../../services/app/message.service';
import {AuthHttpService} from '../../../services/auth/auth-http.service';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent implements OnInit, OnDestroy {
    dark: boolean;
    checked: boolean;
    auth: User;
    system: System;
    formLogin: FormGroup;
    roles: Role[];
    institutions: Institution[];
    flagLogin: string;

    private subscription: Subscription;

    constructor(private authService: AuthService,
                private authHttpService: AuthHttpService,
                private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private router: Router,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
        if (!this.activatedRoute.snapshot.queryParams.token) {
            this.flagLogin = 'login';
        }
        this.authService.verifySession();
        this.subscription = new Subscription();
        this.roles = [];
        this.institutions = [];
        this.auth = {};
    }

    ngOnInit(): void {
        this.buildFormLogin();
        this.getSystem();
        this.verifySessionGoogle();
    }

    verifySessionGoogle() {
        if (this.activatedRoute.snapshot.queryParams.token) {
            this.usernameField.setValue(this.activatedRoute.snapshot.queryParams.username);
            this.authService.setToken({access_token: this.activatedRoute.snapshot.queryParams.token});
            this.getUser();
        }
    }

    getSystem() {
        this.authHttpService.get('systems/' + environment.SYSTEM_ID).subscribe(response => {
            this.system = response['data'];
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    buildFormLogin() {
        this.formLogin = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            keep_session: [false],
        });
    }

    login() {
        this.spinnerService.show();
        this.subscription.add(
            this.authHttpService.login(this.formLogin.value).subscribe(
                response => {
                    this.authService.setToken(response);
                    this.authService.setKeepSession(this.keepSessionField.value);
                    this.authHttpService.resetAttempts().subscribe(response => {
                        this.getUser();
                    }, error => {
                        this.spinnerService.hide();
                        this.messageService.error(error);
                    });
                }, error => {
                    this.spinnerService.hide();
                    this.authService.removeLogin();
                    if (error.status === 401) {
                        this.authHttpService.incorrectPassword(this.usernameField.value).subscribe(response => {
                        }, error => {
                            this.messageService.error(error);
                        });
                        return;
                    }
                    this.messageService.error(error);
                }));
    }

    loginGoogle() {
        this.authHttpService.loginGoogle();
    }

    getUser() {
        this.spinnerService.show();
        this.authHttpService.getUser(this.usernameField.value)
            .subscribe(
                response => {
                    this.spinnerService.hide();
                    this.auth = response['data'];
                    this.authService.auth = response['data'];
                    this.institutions = response['data']['institutions'];
                    this.authService.institutions = response['data']['institutions'];

                    // Error cuando no tiene asiganda una institucion
                    if (this.institutions?.length === 0) {
                        swal.fire({
                            title: 'No tiene una institucion asignada!',
                            text: 'Comuníquese con el administrador!',
                            icon: 'warning'
                        });
                        this.flagLogin = 'login';
                        return;
                    }
                    this.flagLogin = this.auth['is_changed_password'] ? 'selectInstitutionRole' : 'changePassword';
                },
                error => {
                    this.spinnerService.hide();
                    this.messageService.error(error);
                    this.flagLogin = 'login';
                });
    }

    onSubmitLogin(event: Event) {
        event.preventDefault();
        if (this.formLogin.valid) {
            this.login();
        } else {
            this.formLogin.markAllAsTouched();
        }
    }

    get usernameField() {
        return this.formLogin.get('username');
    }

    get passwordField() {
        return this.formLogin.get('password');
    }

    get keepSessionField() {
        return this.formLogin.get('keep_session');
    }
}
