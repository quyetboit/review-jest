import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { of } from 'rxjs';
import { Post } from '../../models';
import { PostService } from '../../services/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

const MOCK_POSTS: Post[] = [
  { id: 1, title: "Title 1", body: "Body 1", userId: 1},
  { id: 2, title: "Title 2", body: "Body 2", userId: 2},
  { id: 3, title: "Title 3", body: "Body 3", userId: 3},
  { id: 4, title: "Title 4", body: "Body 4", userId: 4},
  { id: 5, title: "Title 5", body: "Body 5", userId: 5},
]

const postServiceSpy = {
  getPosts: jest.fn().mockReturnValue(of(MOCK_POSTS))
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostsComponent,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
    })
    .overrideComponent(
      PostsComponent,
      {
        set: {
          providers: [
            { provide: PostService, useValue: postServiceSpy },
          ]
        }
      }
    )
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onInit", () => {
    it("should get posts", () => {
      expect(postServiceSpy.getPosts).toHaveBeenCalled();
    })

    it("should have posts", () => {
      expect(component.posts).toEqual(MOCK_POSTS);
    })
  })
});
