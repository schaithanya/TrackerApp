import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MatTableDataSource } from '@angular/material';
import { SavingsStorageService, Saving, Filter } from './savings-storage.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FileService } from '../../utilities/file.service';
import { Storage } from '@ionic/storage';
import { FilterComponent } from './filter/filter.component';

const Storage_Key = 'savings';

@Component({
  templateUrl: 'savings.dashboard.component.html',
  styles: ['table { width: 100%; margin-left: auto; margin-right: auto; overflow:auto; height:200px;} tr.example-detail-row { height: 0; }tr.example-element-row:not(.example-expanded-row):hover { background: #777; }tr.example-element-row:not(.example-expanded-row):active { background: #efefef; }.example-element-row td { border-bottom-width: 0; } .example-element-detail {  overflow: hidden; display: flex; } .example-element-diagram { width: 100%;  border: 2px solid black; padding: 8px; font-weight: lighter; margin: 8px 0; height: auto; } '],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [SavingsStorageService]
})

export class SavingsDashboard {
  columnNames = { type: 'Type', amount: 'Amount', matAmount: 'matAmount', interest: 'Interest', createdDate: 'Created Date', endDate: 'End Date' };
  columnsToDisplay = ['type', 'amount', 'interest', 'endDate'];
  expandedElement: Saving | null;
  filter: Filter = <Filter>{};


  savings: Saving[] = [];
  saving: Saving = <Saving>{};
  dataSource = new MatTableDataSource(this.savings);

  constructor(private savingsService: SavingsStorageService, private plt: Platform,
    public navCtrl: NavController, private fileService: FileService, private navParams: NavParams,
    private storage: Storage) {
    this.plt.ready().then(() => {
      if (navParams.get("filterData")) {
        this.filter = <Filter>this.navParams.get("filterData");
      }
      this.loadItems();
    });
  }

  loadItems() {
    this.savingsService.getSavingsData().then(savingsData => {
      if (savingsData != null) {
        this.savings = savingsData;
        if(Object.keys(this.filter).length != 0){                  
          this.savings = this.savings.filter((item: Saving) =>             
              (this.filter.type == null || item.type == this.filter.type));
        }

        this.dataSource = new MatTableDataSource(this.savings);
      }
    });
  }

  private showFilterSavings() {
    this.navCtrl.push(FilterComponent, { filterData: this.filter });
  }

  deleteSaving(saving: Saving) {
    this.storage.get(Storage_Key).then(results => {
      this.fileService.removeFile(saving.id);
      let resultValues = [];
      for (let result of results) {
        if (result.id !== saving.id) {
          resultValues.push(result);
        }
      }

      this.storage.set(Storage_Key, resultValues);
      this.savings = resultValues;
      this.dataSource = new MatTableDataSource(this.savings);
    })
  }

  editSaving(saving: Saving) {
    this.navCtrl.push(EditComponent, { savingsData: saving });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    let active = this.navCtrl.getActive();
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }

  createSaving() {
    this.navCtrl.push(CreateComponent);
  }

  viewSaving(saving: Saving) {
    this.fileService.openFile(saving.documentPath, saving.documentType);
  }

  downloadSaving(saving: Saving) {
    this.fileService.downloadFile(saving.id);
  }
}

