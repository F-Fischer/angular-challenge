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
  private routeSubscription2: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      console.log('header checking route', params);
    });

    this.routeSubscription2 = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription2?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}


