import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { EditMenuComponent } from './edit-menu.component';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../interfaces/types';

describe('EditMenuComponent', () => {
  let component: EditMenuComponent;
  let fixture: ComponentFixture<EditMenuComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let router: Router;
  let routerEventsSubject: Subject<Event>;

  const mockMenu: Product = {
    id: 1,
    name: 'Test Menu',
    price: 9.99,
    image: 'test.jpg',
    type: 'test',
    dateEntry: '2022-01-01',
  };

  beforeEach(async () => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', [
      'getMenusById',
      'editMenu',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditMenuComponent],
      imports: [RouterTestingModule],
      providers: [
        Title,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
        { provide: AdminService, useValue: adminServiceSpy },
      ],
    }).compileComponents();

    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    router = TestBed.inject(Router);
    routerEventsSubject = new Subject<Event>();
    spyOnProperty(router, 'events').and.returnValue(routerEventsSubject.asObservable());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the page title', () => {
      const titleService = TestBed.inject(Title);
      spyOn(titleService, 'setTitle').and.stub();
      component.ngOnInit();
      expect(titleService.setTitle).toHaveBeenCalledWith('VQAdmin - Edit Menu');
    });

    it('should load the menu based on route parameter', () => {
      adminService.getMenusById.and.returnValue(of(mockMenu));
      component.ngOnInit();
      expect(adminService.getMenusById).toHaveBeenCalledWith(1);
      expect(component.menu).toEqual(mockMenu);
    });

    it('should set the currentUrl when the route changes', () => {
      const navigationEnd = new NavigationEnd(
        1,
        '/some-url',
        '/previous-url',
      );
      routerEventsSubject.next(navigationEnd);
      expect(component.currentUrl).toEqual('/some-url');
    });
  });

  describe('onSubmit', () => {
    let editMenuSpy: jasmine.Spy;
    let navigateByUrlSpy: jasmine.Spy;

    beforeEach(() => {
      editMenuSpy = spyOn(adminService, 'editMenu').and.stub();
      navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();
    });

    it('should not call adminService.editMenu if menu is undefined', () => {
      component.menu = undefined;
      component.onSubmit({
        name: 'Updated Menu',
        price: 19.99,
        image: 'updated.jpg',
        type: 'updated',
      });
      expect(editMenuSpy).not.toHaveBeenCalled();
      expect(navigateByUrlSpy).not.toHaveBeenCalled();
    });

    it('should call adminService.editMenu and navigate to /menu', () => {
      component.onSubmit({
        name: 'Updated Menu',
        price: 19.99,
        image: 'updated.jpg',
        type: 'updated',
      });
      expect(editMenuSpy).toHaveBeenCalledWith(
        mockMenu.id,
        'Updated Menu',
        19.99,
        'updated.jpg',
        'updated',
        mockMenu.dateEntry
      );
      expect(navigateByUrlSpy).toHaveBeenCalledWith('/menu');
    });



  });
});
