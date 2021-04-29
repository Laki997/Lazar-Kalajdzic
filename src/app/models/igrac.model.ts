import { Tim } from './tim.model';
import { Nacionalnost } from './nacionalnost.model';
export class Igrac {
  id: number;
  ime: string;
  prezime: string;
  brojReg: string;
  datumRodjenja: Date;
  nacionalnost: Nacionalnost;
  tim: Tim;
}
