import { Component, OnInit } from '@angular/core';
import { ConfigureHandlerService } from '../service/configure-handler.service';

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.scss']
})
export class BulkOrderComponent implements OnInit {

  public bulkOrder:any=[];


  constructor(private configHandler:ConfigureHandlerService) {
    this.bulkOrder =this.configHandler.projectTemplateData['bulkOrder']?this.configHandler.projectTemplateData['bulkOrder']:[];
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
        this.bulkOrder= data['bulkOrder']?data['bulkOrder']:[]
      })
      if(this.bulkOrder?.length>0)
      {
        unsubscribeConst.unsubscribe();
      }
  }

  saveData() {
   this.bulkOrder = this.bulkOrder.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1);
   console.log(this.bulkOrder)
   this.configHandler.setProjectTemplateData(this.bulkOrder,'bulkOrder')
  }

}
