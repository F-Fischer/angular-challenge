import { Component } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.less']
})
export class CategoryFilterComponent {
  onSeeAllClick() {
    console.log('onSeeAllClickCategoryFilter');
  }
}
