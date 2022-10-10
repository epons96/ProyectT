import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IBreadcrumdItem } from './class/breadcrumd-item.class';
import { BreadcrumbService } from './service/breadcrumb.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumd',
  templateUrl: './breadcrumd.component.html',
  styleUrls: ['./breadcrumd.component.scss'],
})
export class BreadcrumdComponent implements OnInit, OnDestroy {
  @Input() separator: string;
  public breadcrumbList: IBreadcrumdItem[];
  _unSubscribe: Subscription;

  constructor(private breadcrumbService: BreadcrumbService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this._unSubscribe = this.breadcrumbService.breadcrumbUpdated$.subscribe(data => {
      this.breadcrumbList = data;
    });
  }

  ngOnDestroy() {
    this._unSubscribe.unsubscribe();

  }

  goToLink(breadcrumb: IBreadcrumdItem) {
    if (breadcrumb.link) {
      this.router.navigate([breadcrumb.link]).then(r => false);
    }
  }

}
