import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { authGuardGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
    {path: "home", component: Home},
    {path: "auth/login", loadComponent : () => import("./auth/login/login").then(m => m.Login)},
    {path: "auth/register", loadComponent : () => import("./auth/register/register").then(m => m.Register)},
    {path: "dashboard",loadChildren : () => import("./components/dashboard/dashboard.routes").then(m => m.DASHBOARD_ROUTES),canActivate:[authGuardGuard]},
    {path: "**", redirectTo: "home", pathMatch:'full'},
];
