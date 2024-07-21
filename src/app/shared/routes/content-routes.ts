import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'configure',
    loadChildren: () =>
      import('../../components/configure/configure.module').then(
        (m) => m.ConfigureModule
      ),
    data: {
      breadcrumb: 'Project Configure',
    },
  },

  {
    path: 'coupons',
    loadChildren: () =>
      import('../../components/coupons/coupons.module').then(
        (m) => m.CouponsModule
      ),
    data: {
      breadcrumb: 'Coupons',
    },
  },

  {
    path: 'media',
    loadChildren: () =>
      import('../../components/media/media.module').then((m) => m.MediaModule),
  },

  {
    path: 'users',
    loadChildren: () =>
      import('../../components/users/users.module').then((m) => m.UsersModule),
    data: {
      breadcrumb: 'Users',
    },
  },

  {
    path: 'localization',
    loadChildren: () =>
      import('../../components/localization/localization.module').then(
        (m) => m.LocalizationModule
      ),
    data: {
      breadcrumb: 'Localization',
    },
  },

  {
    path: 'settings',
    loadChildren: () =>
      import('../../components/setting/setting.module').then(
        (m) => m.SettingModule
      ),
    data: {
      breadcrumb: 'Settings',
    },
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('../../components/invoice/invoice.module').then(
        (m) => m.InvoiceModule
      ),
    data: {
      breadcrumb: 'Invoice',
    },
  },
];
