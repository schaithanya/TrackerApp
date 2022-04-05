import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FileService } from '../../utilities/file.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FilterComponent } from './filter/filter.component';
import { Filter, Saving, SavingsStorageService } from './savings-storage.service';

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
  sortedData: Saving[];
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
        if (Object.keys(this.filter).length != 0) {
          this.savings = this.savings.filter((item: Saving) =>
          ((this.filter.type == null || item.type == this.filter.type)
            && (this.filter.name == null || item.name == this.filter.name)));
        }

        let currentYear: number = new Date().getFullYear();
        this.savings = this.savings.filter((item: Saving) => ((new Date(item.endDate)).getFullYear() >= currentYear));
        let initialSort: Sort = { active: 'endDate', direction: 'asc' };
        this.sortData(initialSort);
        //this.dataSource = new MatTableDataSource(this.sortedData);
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

      let initialSort: Sort = { active: 'endDate', direction: 'asc' };
      this.sortData(initialSort);
      //this.dataSource = new MatTableDataSource(this.savings);
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

  sortData(sort: Sort) {
    const data = this.savings;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'type': return compare(a.type, b.type, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'interest': return compare(a.interest, b.interest, isAsc);
        default: return compare(a.type, b.type, isAsc);
      }
    });
    // Always sort based on end date
    this.sortedData = this.sortedData.sort((x, y) => +new Date(x.endDate) - +new Date(y.endDate));
    this.dataSource = new MatTableDataSource(this.sortedData);
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}