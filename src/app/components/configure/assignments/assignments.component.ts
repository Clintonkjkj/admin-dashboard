import { Component, OnInit } from '@angular/core';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { ConfigureHandlerService } from '../service/configure-handler.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {


  
  public createAssignment=[];


  constructor(private configHandler:ConfigureHandlerService) {
    this.createAssignment =this.configHandler.projectTemplateData['createAssignment']?this.configHandler.projectTemplateData['createAssignment']:[];
  }


 public settings = {
    delete: {
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'Id',
        filter: false
      },
    contentType:{
      title: 'Select Content Types',
      type: 'html',
      filter: false,
       editor: {
        type: 'custom',
        component: MultiSelectComponent,
        
      }
    }, 
    componentType: {
        title: 'Component Type',
        filter: false,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'input', title: 'Text Input(small height)' },
              { value: 'text-area', title: 'Text Area Adjustable' },
              { value: 'dropdown', title: 'Dropdown' },
              { value: 'url', title: 'Url Field' },
              { value: 'multichoice', title: 'Multichoice Field' },
              { value: 'multiValue', title: 'MultiValue Field' },
              { value: 'RadioButton', title: 'RadioButton' }
            ],
          },
        },
      }, 
      required: {
        title: 'Is Required',
        filter: false,
        editor: {
          type: 'list',
          config: {
            selectText: 'select',
            list: [
              { value: 'true', title: 'Yes' },
              { value: 'false', title: 'No' }
            ],
          },
        },
      },
      label:{
        title: 'Label text',
        filter: false
      },
      MultiOptions:{
        title: 'MultiOptions(use comma to separate)',
        filter: false
      }
    }
  };
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const index = event.source.data.indexOf(event.data);
      event.source.data.splice(index, 1);
      event.confirm.resolve();
    } else {
  
    }
  }
  ngOnInit() { 
    this.loadCreateData();
  }
  private loadCreateData()
  { 
      const unsubscribeConst= this.configHandler. _getProjectData.subscribe(data=>{
        this.createAssignment= data['createAssignment']?data['createAssignment']:[]
      })
      if(this.createAssignment?.length>0)
      {
        unsubscribeConst.unsubscribe();
      }
  }

  saveData() {
    this.createAssignment = this.createAssignment.sort((a, b) => (a.id > b.id) ? 1 : -1);
   console.log(this.createAssignment)
   this.configHandler.setProjectTemplateData(this.createAssignment,'createAssignment')
  }


}
