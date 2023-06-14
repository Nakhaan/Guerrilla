import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/layout', pathMatch: 'full' },
    {
        path: 'layout',
        component: LayoutComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent
            }
        // {
        //     path: 'preprod',
        //     component: PreprodComponent
        // },
        // {
        //     path: 'shotlist',
        //     component: ShotlistComponent
        // },
        // {
        //     path: 'account',
        //     component: AccountComponent
        // }
        ]
    }
// { path: '*/*', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
