import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  isHomePage: boolean | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      console.log('header checking route', params);
    });
  }
}


