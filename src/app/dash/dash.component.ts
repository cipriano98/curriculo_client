import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }
  dashId: string = ''
  dashLink: string = `https://datastudio.google.com/embed/reporting/${this.dashId}/page/uIg4`
  urlSafe: SafeResourceUrl

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.dashLink);
  }

}
