import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

const MOCK_ID = 1;
const MOCK_POST = {
  id: 1,
  body: "String",
  title: "Title",
  userId: 1,
};
const mockUploadFileSuccess = { success: true };

const activatedRouterSpy = {
  params: of({id: MOCK_ID}),
}

const postServiceSpy = {
  getPostById: jest.fn().mockReturnValue(of(MOCK_POST)),
  uploadFile: jest.fn().mockReturnValue(of(mockUploadFileSuccess)),
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
    .overrideComponent(DetailComponent, {
      set: {
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouterSpy },
          { provide: PostService, useValue: postServiceSpy },
        ]
      }
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should upload file", () => {
    component.fileChange({target: {files: [{ size: 4_000}]} as any} as any);
    component.upload();
    expect(component.uploadSuccess).toEqual(true);
  });

  it("should not change file", () => {
    component.fileChange({target: {files: []} as any} as any);
    expect(component.file).toBeUndefined();
  });

  it("should not upload file", () => {
    component.fileChange({target: {files: []} as any} as any);
    component.upload();
  })
});
