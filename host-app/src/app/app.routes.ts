import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'businessOperation',pathMatch:'full'},
    { path:'businessOperation',
        loadChildren: () => loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        type: 'module',
        exposedModule: './routes'
        }).then(m => m.routes)
        .catch(err => console.log(err))
    },   
];
