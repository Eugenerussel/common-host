import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ViewPortComponent } from './component/view-port/view-port.component';
import { CallbackComponent } from './component/callback/callback.component';
import { AuthGuard } from './service/auth.guard';
import { environment } from '../environments/environment';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'home/login',component:HomeComponent},
    {path:'login',component:HomeComponent},
    {path:'insitz/login/callback',component:CallbackComponent},
    //{path:'insitz',component:ViewPortComponent,canActivate:[AuthGuard],
    {path:'insitz',component:ViewPortComponent,
     children:[
        { 
            path: '', redirectTo: 'businessOperation', pathMatch: 'full'
        },
        {
            path:'businessOperation',
            loadChildren: () => loadRemoteModule({
                //remoteEntry: 'https://your-s3-bucket-name.s3.amazonaws.com/remoteEntry.js',
                remoteEntry: environment.BOPS_REMOTE_ENTRY,
                type: 'module',
                exposedModule: './routes'
            }).then(m => m.routes)
            .catch(err => console.log(err))
        }
]
}   
];
