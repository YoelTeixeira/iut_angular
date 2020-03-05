import {Serializable} from "./serializable";

export class Weapon extends Serializable{
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pv: number;
  maxPoints: number;

  constructor(id = null, name = '', attaque = 1, esquive = 1, degats = 1, pv = 1) {
    super();
    if(id != null) {
      this.id = id;
    }
    this.name = name;
    this.attaque = attaque;
    this.esquive = esquive;
    this.degats = degats;
    this.pv = pv;
    this.maxPoints = 40;
  }

  getTotalPoints(): number {
    return this.attaque +
      this.esquive +
      this.degats +
      this.pv;
  }
}
