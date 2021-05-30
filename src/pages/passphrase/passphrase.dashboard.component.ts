import { Component } from '@angular/core';
import { Platform, NavController, ViewController } from 'ionic-angular';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Storage } from '@ionic/storage';
import { PassphraseStorageService, Passphrase } from './passphrase-storage.service';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const Storage_Key = 'passphrase';

@Component({
  selector: 'PassphraseDashboard',
  templateUrl: 'passphrase.dashboard.component.html',
  styles: ['table { width: 100%; } .delete-button { border-radius: 50%; width: 2em;height: 2em; display: flex; justify-content: center; align-items: center; }'],
  providers: [PassphraseStorageService]
})

export class PassphraseDashboard {
  passphrases: Passphrase[] = [];
  passphrase: Passphrase = <Passphrase>{};
  url: any;

  selection = new SelectionModel<Passphrase>(true, []);
  displayedColumns: string[] = ['passphraseName', 'passphraseText', 'viewPassPhrase','select'];
  dataSource = new MatTableDataSource(this.passphrases);

  constructor(private passphraseService: PassphraseStorageService, private plt: Platform, public navCtrl: NavController, private viewCtrl: ViewController,
              private storage: Storage) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  loadItems() {
    this.passphraseService.getPassphraseData().then(passphraseData => {
      if (passphraseData != null) {
        this.passphrases = passphraseData;
        this.dataSource = new MatTableDataSource(this.passphrases);
      }
    });
  }

  deletePassphrase(passphrase: Passphrase) {
    this.storage.get(Storage_Key).then(results => {     
      let resultValues = [];
      for (let result of results) {
        if (result.id !== passphrase.id) {
          resultValues.push(result);
        }
      }

      this.storage.set(Storage_Key, resultValues);
      this.passphrases = resultValues;
      this.dataSource = new MatTableDataSource(this.passphrases);
    });
  }

  editPassphraseData(passphrase: Passphrase) {
    this.passphrase = passphrase;
    this.navCtrl.push(EditComponent, { passphrase: this.passphrase });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    let active = this.navCtrl.getActive();
    this.navCtrl.remove(active.index);
    this.navCtrl.push(active.component);
  }

  createPassphrase() {
    this.navCtrl.push(CreateComponent);
  }

  viewPassphrase(passPhrase: Passphrase) {    
  }  
}

