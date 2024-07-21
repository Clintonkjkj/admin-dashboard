import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component'
import { AddInfoComponent } from './add-info/add-info.component'
import { BriefingComponent } from './briefing/briefing.component'
import { CreateComponent } from './create/create.component'
import { ReviewComponent } from './review/review.component'
import { OrgDetailsComponent } from './org-details/org-details.component'
import { AssignmentsComponent } from './assignments/assignments.component'
import { BulkOrderComponent } from './bulk-order/bulk-order.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: "Overview",
          breadcrumb: "Overview"
        },
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: "Create a Project",
          breadcrumb: "Create"
        }
      },
      {
        path: 'assignments',
        component: AssignmentsComponent,
        data: {
          title: "Assignments",
          breadcrumb: "Assignments"
        },

      },
      {
        path: 'briefing',
        component: BriefingComponent,
        data: {
          title: "Project Briefing",
          breadcrumb: "Briefing"
        }
      },
      {
        path: 'add-info',
        component: AddInfoComponent,
        data: {
          title: "Additional Info",
          breadcrumb: "Info"
        }
      },
      {
        path: 'org-details',
        component: OrgDetailsComponent,
        data: {
          title: "Organization Details",
          breadcrumb: "Organization"
        },

      },
      {
        path: 'review',
        component: ReviewComponent,
        data: {
          title: "Review",
          breadcrumb: "Review"
        },

      },
      {
        path: 'bulk-order',
        component: BulkOrderComponent,
        data: {
          title: "Bulk order",
          breadcrumb: "Bulk order"
        },

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigureRoutingModule { }
