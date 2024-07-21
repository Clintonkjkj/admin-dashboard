import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: '/dashboard/default',
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'primary',
      active: false,
    },
    {
      title: 'Project Configure',
      icon: 'box',
      type: 'sub',
      active: false,
      children: [
        { path: '/configure/overview', title: 'Overview', type: 'link' },
        { path: '/configure/create', title: 'Create', type: 'link' },
        { path: '/configure/assignments', title: 'Assignments', type: 'link' },
        {
          path: '/configure/briefing',
          title: 'Project Breifing',
          type: 'link',
        },
        { path: '/configure/add-info', title: 'Additional Info', type: 'link' },
        { path: '/configure/org-details', title: 'Org Details', type: 'link' },
        { path: '/configure/review', title: 'Review', type: 'link' },
        {
          path: '/configure/bulk-order',
          title: 'Bulk Order Edit',
          type: 'link',
        },
      ],
    },

    {
      title: 'Coupons',
      icon: 'tag',
      type: 'sub',
      active: false,
      children: [
        { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
        {
          path: '/coupons/create-coupons',
          title: 'Create Coupons',
          type: 'link',
        },
      ],
    },

    {
      title: 'Media',
      path: '/media',
      icon: 'camera',
      type: 'link',
      active: false,
    },

    {
      title: 'Users',
      icon: 'user-plus',
      type: 'sub',
      active: false,
      children: [
        { path: '/users/list-user', title: 'User List', type: 'link' },
        { path: '/users/create-user', title: 'Create User', type: 'link' },
      ],
    },

    {
      title: 'Localization',
      icon: 'chrome',
      type: 'sub',
      children: [
        {
          path: '/localization/translations',
          title: 'Translations',
          type: 'link',
        },
        {
          path: '/localization/currency-rates',
          title: 'Currency Rates',
          type: 'link',
        },
        { path: '/localization/taxes', title: 'Taxes', type: 'link' },
      ],
    },

    {
      title: 'Settings',
      icon: 'settings',
      type: 'sub',
      children: [{ path: '/settings/profile', title: 'Profile', type: 'link' }],
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: 'archive',
      type: 'link',
      active: false,
    },
    {
      title: 'Login',
      path: '/auth/login',
      icon: 'log-in',
      type: 'link',
      active: false,
    },
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
