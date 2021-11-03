import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CecyRouting} from './cecy.routing';

// PrimeNG Modules
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';



// My Components
import {CecyComponent} from './cecy.component';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
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
import {RippleModule} from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CecyRouting),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        TooltipModule,
        DialogModule,
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
    CardModule,
    SkeletonModule,
    RippleModule,
    ],
    declarations: [CecyComponent],
    exports: [],
    providers: []
})
export class CecyModule {
}
