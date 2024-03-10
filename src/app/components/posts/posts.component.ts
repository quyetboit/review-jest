import { Component, OnInit } from '@angular/core';
import { Post } from '../../models';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [PostService],
})
export class PostsComponent implements OnInit {
  page = 0;
  size = 5;
  posts: Post[] = [];

  constructor (private postService: PostService) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts(this.page, this.size).subscribe((posts: Post[]) => this.posts = posts);
  }
}
