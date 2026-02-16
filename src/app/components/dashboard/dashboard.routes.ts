import { Routes } from '@angular/router';
import { List } from './list/list';
import { Create } from './create/create';

export const DASHBOARD_ROUTES: Routes = [
    {path : "list", component: List},
    {path : "create", component: Create}
];
