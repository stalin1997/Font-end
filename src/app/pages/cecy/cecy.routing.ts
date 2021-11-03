import {Routes} from '@angular/router';
import {CecyComponent} from './cecy.component';
import {AuthGuard} from '../../shared/guards/auth.guard';

export const CecyRouting: Routes = [
    {
        path:'',
        children: [
          {
            path: 'docente',
            loadChildren: () => import('./docente/docente.module').then(m => m.DocenteModule),
            canActivate: [AuthGuard]
          }
        ]
      }
];
