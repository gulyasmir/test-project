import { v4 as uuidv4 } from 'uuid';

export class OneTimeLink {
  id: string;
  value: string;
  isActive: boolean;

  constructor(value: string) {
    this.id = uuidv4();
    this.value = value;
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
