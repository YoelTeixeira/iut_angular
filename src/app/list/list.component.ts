import {Component, OnInit} from '@angular/core';
import { HeroService } from '../services/hero.service';
import {WeaponService} from "../services/weapon.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  header: string[];
  content;
  sortedBy = null;
  sortType = {};
  filteredContent;
  entity;
  labels = {
    hero: 'Héros',
    weapon: 'Armes'
  };
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService) { }

  ngOnInit() {
    // Recharge les données à chaque changement de paramètre
    this.route.params.subscribe(routeParams => {
      this.getEntityList(routeParams.entity);
    });
  }

  getEntityList(entity): void {
    this.entity = entity;
    if(this.entity === 'hero') {
      this.getHeroes();
    } else if(this.entity === 'weapon') {
      this.getWeapons();
    }
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe((weapons) => {
      this.content = weapons;
      this.filteredContent = weapons;
      this.header = ['name', 'attaque', 'degats', 'esquive', 'pv'];
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        this.content = heroes;
        this.filteredContent = heroes;
        this.header = ['name', 'attaque', 'degats', 'esquive', 'pv'];
      });
  }

  sortBy(field): void {
    if(this.sortedBy !== field) {
      for(const f in this.sortType) {
        this.sortType[f] = null;
      }
    }

    this.sortedBy = field;

    if(this.sortType[field] === null || this.sortType[field] === undefined || this.sortType[field] === 'up') {
      this.sortType[field] = 'down';
      console.log(this.sortType, 'sortType')
      this.filteredContent.sort((a, b) => (a[field] < b[field]) ? -1 : 1);
    }

    if(this.sortType[field] === 'down') {
      this.sortType[field] = 'up';
      this.filteredContent.sort((a, b) => (a[field] < b[field]) ? 1 : -1);
    }
  }

  isSortedBy(field): boolean {
    return this.sortedBy === field ? true : false;
  }
}
