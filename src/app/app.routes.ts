import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
    {path: "home", component: Home},
    {path: "auth/login", loadComponent : () => import("./auth/login/login").then(m => m.Login)},
    {path: "auth/register", loadComponent : () => import("./auth/register/register").then(m => m.Register)},
    {path: "dashboard", loadComponent : () => import("./components/dashboard/dashboard").then(m => m.Dashboard), loadChildren : () => import("./components/dashboard/dashboard.routes").then(m => m.DASHBOARD_ROUTES)},
    {path: "**", redirectTo: "home", pathMatch:'full'},
];
