import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShorteningComponent } from '../../app/components/url-shortening.component';

describe('UrlShorteningComponent', () => {
  let component: UrlShorteningComponent;
  let fixture: ComponentFixture<UrlShorteningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlShorteningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlShorteningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
