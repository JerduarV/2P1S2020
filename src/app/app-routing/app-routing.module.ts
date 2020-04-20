import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { CanActivateViaAuthGuard } from '../Auxiliares/AuthGuard';


    export const routes: Routes = [
        
        {
            path: 'main/:nivel',
            component: MainPageComponent,
            canActivate: [CanActivateViaAuthGuard]
        },
        {   
            path: '',
            redirectTo: '/login',
            pathMatch: 'full'
        },
        {
            path: '**', 
            redirectTo: '/main/Avanzado' 
        }
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }
