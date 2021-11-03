// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';



// My Components
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../../shared/shared.module';
import {RippleModule} from 'primeng/ripple';
import {CalendarModule} from 'primeng/calendar';

import {RadioButtonModule} from 'primeng/radiobutton';
import { DocenteRouting } from './docente.routing';
import { DocenteComponent } from './docente.component';
import { CourseComponent } from './course/course.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { EvidenceListComponent } from './evidence/evidence-list/evidence-list.component'
import { EvidenceFormComponent } from './evidence/evidence-form/evidence-form.component';
import { GradesComponent } from './grades/grades.component';
import { GradesListComponent } from './grades/grades-list/grades-list.component';
import { GradesFormComponent } from './grades/grades-form/grades-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocenteRouting),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    AutoCompleteModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    DialogModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    TooltipModule,
    DropdownModule,
    PaginatorModule,
    KeyFilterModule,
    TabViewModule,
    TreeModule,
    AccordionModule,
    OverlayPanelModule,
    SharedModule,
    CardModule,
    SkeletonModule,
    RippleModule,
    CalendarModule,
    RadioButtonModule,
    
  ],
  declarations: [
    
    DocenteComponent,
    CourseFormComponent,
    EvidenceFormComponent,
    CourseComponent,
    CourseListComponent,
    EvidenceComponent,
    EvidenceListComponent,
    GradesComponent,
    GradesListComponent,
    GradesFormComponent
   
  ],
})
export class DocenteModule { }
