import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
