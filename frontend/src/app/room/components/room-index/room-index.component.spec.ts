import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomIndexComponent } from './room-index.component';

describe('RoomIndexComponent', () => {
  let component: RoomIndexComponent;
  let fixture: ComponentFixture<RoomsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
