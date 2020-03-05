import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Weapon} from '../data/weapon';
import {WeaponService} from '../services/weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {
  weapon: Weapon;
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
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // S'il y a un id on récupère l'arme sinon on crée une nouvelle arme.
    if(id !== '' && id !== null) {
      this.weaponService.getWeapon(id).subscribe(weapon => this.weapon = weapon);
    } else {
      this.weapon = new Weapon(null, '', 1, 1, 1, 1);
    }
  }

  editWeapon(): void {
    if(this.isValid()) {
      if(this.weapon.id === '' || this.weapon.id === null || this.weapon.id === undefined) {
        this.weaponService.addWeapon(this.weapon);
      } else {
        this.weaponService.updateWeapon(this.weapon.id, this.weapon);
      }
      this.router.navigate(['/']);
    }
  }

  isValid(): boolean {
    this.error = '';

    // Vérification nom
    if(this.weapon.name === '') {
      this.error = "Veuillez indiquer un nom à l'arme";
    }

    // Vérification intervalle -5 et 5 pour caractéristiques
    this.caracteristics.forEach((c) => {
      if(Math.abs(this.weapon[c.property]) > 5) {
        this.error = "Les caractéristiques doivent être comprise entre -5 et 5";
      }
    });

    // Vérification somme des caractéristiques égale à 0
    if(this.getSum() !== 0) {
      this.error = "La somme des caractéristiques doit être égale à 0";
    }

    if(this.error == '') {
      return true;
    } else {
      return false;
    }
  }

  getSum(): number {
    return this.weapon.attaque + this.weapon.degats + this.weapon.esquive + this.weapon.pv;
  }

  goBack(): void {
    this.location.back();
  }
}
