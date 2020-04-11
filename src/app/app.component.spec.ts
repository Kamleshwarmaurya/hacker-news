import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { ShortdomainPipe } from './pipes/shortdomain.pipe';
import { DateAgoPipe } from './pipes/dateago.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PostService } from './services/post.service';
import { MockPostService } from './mocks/mock.post-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginationComponent } from './components/pagination/pagination.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        PostComponent,
        ShortdomainPipe,
        DateAgoPipe,
        SpinnerComponent,
        PaginationComponent
      ],
      providers: [
        {
          provoid: PostService,
          useClass: MockPostService
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
