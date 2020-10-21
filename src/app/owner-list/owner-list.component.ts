import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  selectedIndex: Array<any> = [];

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit() {
    this.carService.getOwners().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }

  handleClick(index: number) {
    if(this.selectedIndex.includes(index)) {
      const _index = this.selectedIndex.indexOf(index);
      if (_index > -1) {
        this.selectedIndex.splice(_index, 1);
      }
    } else {
      this.selectedIndex.push(index);
    }

  }

  removeOwners() {
    this.selectedIndex.forEach((index)=> {
      let href = this.owners[index]._links.owner.href;
      this.carService.deleteOwner(href).subscribe(result => {
      }, error => console.error(error));
      this.owners.splice(index, 1);
    })
    this.selectedIndex = [];
  }

  editOwner() {
    this.goToEditOwner(this.selectedIndex[0]);
  }

  goToEditOwner(index){
    let owner = this.owners[index];
    let splittedHref = owner._links.owner.href.split('/');
    let ownerId = splittedHref[splittedHref.length-1]
    this.router.navigate(['/owner-edit', ownerId]);
  }
}
