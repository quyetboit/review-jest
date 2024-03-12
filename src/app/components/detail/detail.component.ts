import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../models';
import { finalize, map, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { DebounceClickDirective } from '../../directives/debounce-click.directive';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterLink,
    DebounceClickDirective,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [PostService],
})
export class DetailComponent implements OnInit {

  post?: Post;
  isLoading = false;
  file?: File;
  uploadSuccess = false;

  constructor (
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(postId => this.postService.getPostById(postId).pipe(finalize(() => this.isLoading = false))),
    ).subscribe(post => {
      this.post = post;
    })
  }

  fileChange(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    if (!files || !files.length) {
      this.file = undefined;
      return;
    }
    this.file = files[0];
  }

  upload() {
    if (!this.file) {
      console.log("Not file selected");
      return;
    }
    
    this.postService.uploadFile(this.file).subscribe(res => {
      this.uploadSuccess = res.success;
      console.log("Upload file: ", res);
    });
  }
}
