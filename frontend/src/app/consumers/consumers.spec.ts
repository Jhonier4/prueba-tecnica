import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consumers } from './consumers';

describe('Consumers', () => {
  let component: Consumers;
  let fixture: ComponentFixture<Consumers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consumers],
    }).compileComponents();

    fixture = TestBed.createComponent(Consumers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
