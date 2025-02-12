import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewPortComponent } from './view-port/view-port.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:HomeComponent},
    {path:'insitz',component:ViewPortComponent,
     children:[
        { 
            path: '', redirectTo: 'businessOperation', pathMatch: 'full'
        },
        {
            path:'businessOperation',
            loadChildren: () => loadRemoteModule({
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                type: 'module',
                exposedModule: './routes'
            }).then(m => m.routes)
            .catch(err => console.log(err))
        }
]
}   
];
