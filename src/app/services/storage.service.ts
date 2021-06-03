import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  public get(key: string) {
    return this.storage.get(key);
  }

  public set(key: string, value: any) {
    return this.storage.set(key, value);
  }
}
