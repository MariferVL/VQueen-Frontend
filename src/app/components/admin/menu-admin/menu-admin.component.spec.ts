import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { MenuAdminComponent } from './menu-admin.component';
import { AdminService } from '../../../services/admin.service';
import { Product } from '../../../interfaces/types';
import { MenuModalComponent } from '../../modals/menu-modal/menu-modal.component';

describe('MenuAdminComponent', () => {
  let component: MenuAdminComponent;
  let fixture: ComponentFixture<MenuAdminComponent>;
  let adminServiceMock: jasmine.SpyObj<AdminService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const mockAdminService = jasmine.createSpyObj('AdminService', ['getMenus', 'createMenu', 'deleteMenu']);
    const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [MenuAdminComponent],
      providers: [
        Title,
        { provide: AdminService, useValue: mockAdminService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuAdminComponent);
    component = fixture.componentInstance;
    adminServiceMock = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    dialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    // Mock the response for getMenus
    const mockMenus: Product[] = [
      { id: 1, name: 'Menu 1', price: 10, image: 'image1.jpg', type: 'Type 1', dateEntry: '2022-01-01' },
      { id: 2, name: 'Menu 2', price: 20, image: 'image2.jpg', type: 'Type 2', dateEntry: '2022-01-02' }
    ];
    adminServiceMock.getMenus.and.returnValue(of(mockMenus));

    // Mock the response for createMenu
    adminServiceMock.createMenu.and.returnValue(of(null as any));

    // Mock the response for deleteMenu
    adminServiceMock.deleteMenu.and.returnValue(of(null));
  });

  it('should initialize the component and fetch menus', () => {
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.menus.length).toBe(2);
    expect(component.filteredMenus.length).toBe(2);
    expect(adminServiceMock.getMenus).toHaveBeenCalled();
  });

  it('should filter menus by menu type', () => {
    fixture.detectChanges();

    component.filterMenus('Type 1');

    expect(component.selectedMenuType).toBe('Type 1');
    expect(component.filteredMenus.length).toBe(1);
    expect(component.filteredMenus[0].name).toBe('Menu 1');
  });

  it('should open the menu modal on submit', () => {
    fixture.detectChanges();

    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogMock.open.and.returnValue(dialogRefMock);

    const data: (string | number)[] = [1, 'New Menu', 30, 'new-menu.jpg', 'Type 3', '2022-01-03'];
    dialogRefMock.afterClosed.and.returnValue(of(data));

    component.onSubmit();

    expect(dialogMock.open).toHaveBeenCalledWith(MenuModalComponent, {
      width: '800px',
      data: { menus: component.menus },
    });
    expect(adminServiceMock.createMenu).toHaveBeenCalledWith(
      data[0] as number,
      data[1] as string,
      data[2] as number,
      data[3] as string,
      data[4] as string,
      data[5] as string
    );   

    expect(component.menus.length).toBe(3);
    expect(component.filteredMenus.length).toBe(3);
  });

  it('should delete a menu on delete clicked', () => {
    fixture.detectChanges();

    const menuId = 1;
    component.onDeleteClicked(menuId);

    expect(adminServiceMock.deleteMenu).toHaveBeenCalledWith(menuId);
    expect(component.menus.length).toBe(1);
    expect(component.menus[0].id).toBe(2);
  });

  it('should unsubscribe on component destroy', () => {
    fixture.detectChanges();

    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  // Add more test cases to cover other scenarios...

});
