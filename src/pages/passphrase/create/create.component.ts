import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Passphrase, PassphraseStorageService } from '../passphrase-storage.service';
import { PassphraseDashboard } from '../passphrase.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [PassphraseStorageService]
})

export class CreateComponent implements OnInit {
  passphrase: Passphrase = <Passphrase>{};
  constructor(private passphraseService: PassphraseStorageService, public navCtrl: NavController, public navParams: NavParams) { }
  ngOnInit() {
  }

  private savePassphraseData() {
    this.passphrase.id = "Passphrase" + Date.now();
    this.passphraseService.addPassphrase(this.passphrase).then(item => {
      this.navCtrl.push(PassphraseDashboard);
    });
  }
}