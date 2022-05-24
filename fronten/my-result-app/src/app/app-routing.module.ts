import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { DisplayComponent } from './components/display/display.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './components/services/auth.guard';

const routes: Routes = [
  {
    path:"result",
    component:ResultComponent,
    pathMatch:"full",
    canActivate:[AuthGuard]

  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"search",
    component:SearchComponent,
    pathMatch:"full"

  },
  {
    path:"add",
    component:AddComponent,
    pathMatch:"full"
  },
  {
    path:"edit/:rollno",
    component: EditComponent,
    pathMatch:"full"
  },
  {
  path:"output/:rollno",
  component: DisplayComponent,
  pathMatch:'full'
  },
  {
    path:"register",
    component:LoginComponent,
    pathMatch:'full',
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
