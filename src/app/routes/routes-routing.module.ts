import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/routes/not-found/not-found.component';
import { LayoutComponent } from '@app/layout/layout.component';

const main: Routes = [
  {
    path: 'article',
    loadChildren: () => import('@app/routes/article/article.module').then(v => v.ArticleModule)
  }
];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: main
  },
  {
    path: 'sign',
    loadChildren: () => import('@app/routes/sign/sign.module').then(v => v.SignModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
