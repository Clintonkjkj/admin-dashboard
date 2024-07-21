import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ConfigureHandlerService } from '../service/configure-handler.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit  {
  
  public overviewTemplate:any;


  constructor(private configHandler:ConfigureHandlerService, private _snackBar: MatSnackBar) {
    this.overviewTemplate = this.configHandler.projectTemplateData['overview'];
    
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
      tile:{
        title: 'Tile Name',
        filter: false
      }
    }
    //   type: {
    //     title: 'Component Type',
    //     editor: {
    //       type: 'list',
    //       config: {
    //         selectText: 'Select',
    //         list: [
    //           { value: '1', title: 'Dropdown' },
    //           { value: '2', title: 'Text box' }
    //         ],
    //       },
    //     },
    //   },
    //   entry_type: {
    //     title: 'Component Title',
    //   },
    //   option: {
    //     title: 'Optional',
    //     editor: {
    //       type: 'list',
    //       config: {
    //         selectText: 'select',
    //         list: [
    //           { value: '1', title: 'Yes' },
    //           { value: '2', title: 'No' }
    //         ],
    //       },
    //     },
    //   }
    // },
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
    this.loadOverviewData();
  }
  private loadOverviewData()
  { 
      const unsubscribeConst= this.configHandler. _getProjectData.subscribe(data=>{
        this.overviewTemplate= data['overview']?data['overview']:[];
      })
      if(this.overviewTemplate?.length>0)
      {
        unsubscribeConst.unsubscribe();
      }
  }

  saveData() {
    this.overviewTemplate = this.overviewTemplate.sort((a, b) => (a.id > b.id) ? 1 : -1);
  this.configHandler.setProjectTemplateData(this.overviewTemplate,'overview')
    this._snackBar.open('Changes saved successfully' , 'close');
   }
}
