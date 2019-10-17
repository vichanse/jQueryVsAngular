import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-app';
  beers$: Observable<any[]>;
  search = new FormControl();
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.beers$ = this.http.get<any[]>(
      'https://api.punkapi.com/v2/beers?page=1&per_page=10&brewed_after=11-2014&abv_gt=6'
    );
  }

  updateBeers() {
    this.beers$ = this.beers$.pipe(
      map(beers => {
        return beers.map(beer => {
          const abv = beer.attenuation_level + ' | ' + beer.abv;
          return { ...beer, abv };
        });
      })
    );
  }
}
