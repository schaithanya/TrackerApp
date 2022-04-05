import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Passphrase, PassphraseStorageService } from '../passphrase-storage.service';
import { PassphraseDashboard } from '../passphrase.dashboard.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [PassphraseStorageService]
})
export class EditComponent implements OnInit {

  passphrase: Passphrase = this.navParams.get('passphrase');
  constructor(private documentService: PassphraseStorageService, public navCtrl: NavController, public navParams: NavParams, private plt: Platform) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
  }

  loadItems() {
  }

  private updateDocumentData() {
    this.documentService.updatePassphraseData(this.passphrase).then(item => {
      this.navCtrl.push(PassphraseDashboard);
    });
  }
}