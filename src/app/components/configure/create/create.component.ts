import { Component, OnInit } from '@angular/core';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { ConfigureHandlerService } from '../service/configure-handler.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
 
  public createProject=[];


  constructor(private configHandler:ConfigureHandlerService) {
    this.createProject =this.configHandler.projectTemplateData['createProject']?this.configHandler.projectTemplateData['createProject']:[];
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
        this.createProject= data['createProject']?data['createProject']:[]
      })
      if(this.createProject?.length>0)
      {
        unsubscribeConst.unsubscribe();
      }
  }

  saveData() {
   this.createProject = this.createProject.sort((a, b) => (a.id > b.id) ? 1 : -1);
   console.log(this.createProject)
   this.configHandler.setProjectTemplateData(this.createProject,'createProject')
  }

}
