// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import { DocenteComponent } from './docente.component';

// My Components

export const DocenteRouting: Routes = [
    {
        path: '',
        component: DocenteComponent,
        canActivate: [AuthGuard]
    }
];