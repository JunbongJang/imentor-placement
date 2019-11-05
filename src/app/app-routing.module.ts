import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {WritingTestComponent} from './writing-test/writing-test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/writing', pathMatch: 'full'},
  { path: 'main', component: MainMenuComponent, data: { state: 'main-menu' }},
  { path: 'writing', component: WritingTestComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },

  // routes get parsed from top to bottom so  always put this double asterisk at the end
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always', preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
