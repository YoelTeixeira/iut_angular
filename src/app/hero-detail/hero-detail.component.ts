import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../data/hero';
import { HeroService }  from '../services/hero.service';
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  weapons: Weapon[];
  caracteristics = [
    {label: 'Attaque', property: 'attaque'},
    {label: 'Esquive', property: 'esquive'},
    {label: 'Dégâts', property: 'degats'},
    {label: 'Points de vie', property: 'pv'}
    ];
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  /**
   * @description Retourne un héro qui est en base si le paramètre id existe. Sinon crée un nouveau héro pour l'ajouter par la suite en base.
   */
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== '' && id !== null && id != undefined) {
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    } else {
      this.hero = new Hero();
    }
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  /**
   * @description Fonction appelée au clique du bouton pour insérer ou modifier un héro, en fonction de l'existence d'un id.
   */
  editHero(): void {
    if(this.isValid()) {
      if(this.hero.id === '' || this.hero.id === null || this.hero.id === undefined) {
        this.heroService.addHero(this.hero);
      } else {
        this.heroService.updateHero(this.hero.id, this.hero);
      }
      this.router.navigate(['/']);
    }
  }

  /**
   * @description Fonction de vérification des champs.
   */
  isValid(): boolean {
    this.error = '';

    if(this.hero.name === '') {
      this.error = 'Veuillez indiquer un nom au héro';
    }

    if(this.error == '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description Ajoute un point à la caractéristique (attaque, esquive ...) passée en paramètre.
   * @param property
   */
  addPoint(property): void {
    if(this.hero.getTotalPoints() < this.hero.maxPoints) {
      this.hero[property]++;
      this.error = '';
    } else {
      this.error = "Il n'y a plus de points disponibles.";
    }
  }

  /**
   * @description Enlève un point à la caractéristique (attaque, esquive ...) passée en paramètre.
   * @param property
   */
  removePoint(property): void {
    if(this.hero[property] > 1) {
      this.hero[property]--;
      this.error = '';
    } else {
      this.error = 'Chaque champ doit avoir au minimum 1 point.';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
