import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
  {
    path: "post/:id",
    component: DetailComponent,
  },
  {
    path: "",
    component: PostsComponent,
  },
];
