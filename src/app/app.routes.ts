import { Routes } from '@angular/router';

import { LoginComponent } from './authentification/login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'overview',
                loadComponent: () => import('./overview/overview.component').then(x => x.OverviewComponent)
            },
            {
                path: 'preprod',
                loadComponent: () => import('./preprod/preprod.component').then(x => x.PreprodComponent)
            },
            {
                path: 'shotlist',
                loadComponent: () => import('./preprod/shotlist/shotlist.component').then(x => x.ShotlistComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];


