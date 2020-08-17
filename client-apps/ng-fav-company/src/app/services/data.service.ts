import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiRoot = 'http://127.0.0.1:3300';

  constructor() { }
}

