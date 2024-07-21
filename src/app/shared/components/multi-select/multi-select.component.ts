import { Component, ElementRef, ViewChild } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { ConfigureHandlerService } from '../../../../app/components/configure/service/configure-handler.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent extends DefaultEditor {
  @ViewChild('multiSelect') multiSelect: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;
  public optionArray: any = [];
  public inputData: any;
  private overviewTemplate;

  constructor(private configHandler: ConfigureHandlerService) {
    super();
    this.overviewTemplate = this.configHandler.projectTemplateData['overview'];
  }

  ngOnInit(): void {
    this.inputData = this.cell['value'].replace(/<[^>]+>/g, '').split(',');
    this.loadData();
  }

  optionChange(event) {
    this.cell.newValue = `<a>${event}</a>`;
  }
  private loadData() {
    const unsubscribeConst = this.configHandler._getProjectData.subscribe(
      (data) => {
        this.overviewTemplate = data['overview'] ? data['overview'] : [];
      }
    );
    if (this.overviewTemplate?.length > 0) {
      unsubscribeConst.unsubscribe();
      this.processData();
    }
  }
  private processData() {
    Object.values(this.overviewTemplate).forEach((key) => {
      this.optionArray.push(key['tile']);
    });
  }
}
