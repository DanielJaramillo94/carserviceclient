import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService, private router: Router) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }

  goToEditCar(index){
    let car = this.cars[index];
    let splittedHref = car._links.car.href.split('/');
    let carId = splittedHref[splittedHref.length-1]
    this.router.navigate(['/car-edit', carId]);
  }
}
