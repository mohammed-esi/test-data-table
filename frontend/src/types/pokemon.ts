import { ObjectId } from './objectId';

export interface Pokemon {
  id: ObjectId;
  name: string;
  type: [string];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}
