import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfigureRoutingModule } from './configure-routing.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { OverviewComponent } from './overview/overview.component'
import { AddInfoComponent } from './add-info/add-info.component'
import { BriefingComponent } from './briefing/briefing.component'
import { CreateComponent } from './create/create.component'
import { ReviewComponent } from './review/review.component'
import { OrgDetailsComponent } from './org-details/org-details.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { BulkOrderComponent } from './bulk-order/bulk-order.component'

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};



@NgModule({
  declarations: [OverviewComponent, AddInfoComponent, BriefingComponent, CreateComponent, ReviewComponent, OrgDetailsComponent, AssignmentsComponent, BulkOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ConfigureRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    MatSnackBarModule,
    DropzoneModule,
    GalleryModule.forRoot()
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal
  ]
})
export class ConfigureModule { }
