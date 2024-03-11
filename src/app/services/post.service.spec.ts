import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing"
import { PostService } from "./post.service"
import { environment } from "../../environments/environment";

describe("Post service", () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    })

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  it("Should create service", () => {
    expect(service).toBeTruthy();
  });

  it("Should return list post", () => {
    const mockListPost = [{ id: 1, name: "Mock name"}];

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockListPost);
    })

    const req = httpMock.expectOne(`${environment.api_url}/posts?_start=0&_limit=5`);
    expect(req.request.method).toBe("GET");
    req.flush(mockListPost);
  });

  it("Should return post", () => {
    const mockPost = { id: 1, name: "Mock post" };

    service.getPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.api_url}/posts/1`);
    expect(req.request.method).toBe("GET");
    req.flush(mockPost);
  });

  it("Should get user", () => {
    const mockUser = {id: 1, name: "Mock user"};
    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${environment.api_url}/users/1`);
    expect(req.request.method).toBe("GET");
    req.flush(mockUser);
  })

  it("Should upload file success", () => {
    service.uploadFile({ size: 4_000 } as File).subscribe(res => {
      expect(res).toEqual({success: true});
    })
  });

  it("Should upload file failure", () => {
    service.uploadFile({ size: 6_000 } as File).subscribe(res => {
      expect(res).toEqual({success: false});
    })
  })

  afterEach(() => {
    httpMock.verify();
  })
})