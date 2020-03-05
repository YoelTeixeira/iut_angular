import { Component, OnInit } from '@angular/core';
import {Hero} from "../data/hero";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
  round;
  maxRounds;
  error;
  heroes;
  selectedHero;
  enemyHero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.maxRounds = 5;
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  initFight() {
    if(this.selectedHero === undefined) {
      this.error = 'Veuillez choisir un héro pour combattre';
    } else {
      this.error = '';
      this.enemyHero = this.getRandomHero();
      this.round = 1;
      this.nextRound();
    }
  }

  finishFight() {

  }

  nextRound() {
    if(this.round === this.maxRounds) {
      this.finishFight();
    } else {

      this.round++;
    }
  }

  getRandomHero(): Hero {
    return this.heroes[Math.floor(Math.random() * this.heroes.length)];
  }
}
