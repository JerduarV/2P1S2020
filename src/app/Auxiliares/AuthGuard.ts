import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from './User';

@Injectable({
    providedIn: 'root'
  })
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: UserServiceService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        let user: User = this.authService.getUserLogeado();
        console.log(user);
        if (user == undefined) {
            console.log('No estás logueado');
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}