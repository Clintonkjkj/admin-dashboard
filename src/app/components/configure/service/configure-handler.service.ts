import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { digitalListDB } from 'src/app/shared/tables/digital-list';


@Injectable({
  providedIn: 'root'
})
export class ConfigureHandlerService {
  public projectTemplateData={};
  private _projectDataObservable = new Subject<{}>();
  _getProjectData = this._projectDataObservable.asObservable();

  constructor(private afAuth: AngularFireAuth,
     private firestore: AngularFirestore,
     private snackBar: MatSnackBar,
      private zone: NgZone
     ) {
    this.getProjectTemplateData();
  }

  public setProjectTemplateData(data,key:string)
  {
    this.projectTemplateData[key]=data;
    console.log(this.projectTemplateData)
    this.afAuth.authState.subscribe(isUser => {
      if (isUser) {
      // const  isData = this.firestore.doc('/common/configure').valueChanges();
      // if(isData)
      // {('common').doc('configure')
      //   .update(this.projectTemplateData);
      //   return true;
      // }  else{
        try{
          this.firestore.collection('common').doc('configure')
          .set(this.projectTemplateData);
          const duration = 5000;
          this.zone.run(() => {
            this.snackBar.open('Changes saved successfully' , 'close', { duration });
        });
        }
        catch(e){
          const duration = 5000;
          this.zone.run(() => {
            this.snackBar.open('Operation Unsuccessfully'+e, 'close', { duration });
        });
        }   
      }
      else{
        const duration = 5000;
        this.zone.run(() => {
          this.snackBar.open('Operation Unsuccessfully' , 'close', { duration });
      });
      }
    });
  }

  public getProjectTemplateData()
  {
    this.firestore.doc('/common/configure').valueChanges().subscribe(data=>{
      this.projectTemplateData=data
      this._projectDataObservable.next(data)
    })
  }

  
}
