// import
import Dashboard from 'views/Dashboard/Dashboard';
import Tables from 'views/Dashboard/Tables';
import Billing from 'views/Dashboard/Billing';
import RTLPage from 'views/Dashboard/RTL';
import Profile from 'views/Dashboard/Profile';
import Login from 'views/Auth/Login.js';
import SignUp from 'views/Auth/SignUp.js';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from 'components/Icons/Icons';

var dashRoutes = [
  {
    path: '/producers',
    name: 'Local Farmers',
    icon: <HomeIcon color='inherit' />,
    component: LocalFarmers,
    layout: '/wholesale',
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   rtlName: 'لوحة القيادة',
  //   icon: <HomeIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Tables',
  //   rtlName: 'لوحة القيادة',
  //   icon: <StatsIcon color='inherit' />,
  //   component: Tables,
  //   layout: '/admin',
  // },
  // {
  //   path: '/billing',
  //   name: 'Billing',
  //   rtlName: 'لوحة القيادة',
  //   icon: <CreditIcon color='inherit' />,
  //   component: Billing,
  //   layout: '/admin',
  // },
  // {
  //   path: '/rtl-support-page',
  //   name: 'RTL',
  //   rtlName: 'آرتيإل',
  //   icon: <SupportIcon color='inherit' />,
  //   component: RTLPage,
  //   layout: '/rtl',
  // },
  {
    name: 'My Account',
    category: 'wholesale-account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'My shop account',
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: WholesaleProfile,
        layout: '/wholesale',
      },
      {
        path: '/contracts',
        name: 'Contracts',
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Contracts,
        layout: '/wholesale',
      },
      {
        path: '/comands',
        name: 'Contracts',
        icon: <CreditIcon color='inherit' />,
        secondaryNavbar: true,
        component: Comands,
        layout: '/wholesale',
      },
    ],
  },

  {
    name: 'Your Farm Account',
    category: 'producer-account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'My shop account',
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: ProducerProfile,
        layout: '/producer',
      },
      {
        path: '/login',
        name: 'Login',
        rtlName: 'لوحة القيادة',
        icon: <DocumentIcon color='inherit' />,
        component: Login,
        layout: '/auth',
      },
      {
        path: '/signup',
        name: 'Sign Up',
        rtlName: 'لوحة القيادة',
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: '/auth',
      },
    ],
  },
];
export default dashRoutes;
