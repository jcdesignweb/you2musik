import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'search/:s', component: SearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
