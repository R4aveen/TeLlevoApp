import { Injectable } from '@angular/core';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuthModule) { }
}
