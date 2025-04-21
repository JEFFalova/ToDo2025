import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtuPage } from './atu.page';

describe('AtuPage', () => {
  let component: AtuPage;
  let fixture: ComponentFixture<AtuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
