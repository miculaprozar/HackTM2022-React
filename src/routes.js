// import

// General Components
import Dashboard from 'views/Dashboard/Dashboard';

// Wholesale Components
import LocalFarmers from 'views/Wholesale/LocalFarmers';
import WholesaleProfile from 'views/Wholesale/Profile';
import Contracts from 'views/Wholesale/Contracts';
import Comands from 'views/Wholesale/Comands';

// Producer Components
import ProducerProfile from 'views/Wholesale/Profile';
import ProducerContracts from 'views/Wholesale/Contracts';
import ProducerComands from 'views/Wholesale/Comands';

// import Billing from 'views/Dashboard/Billing';
import SignIn from 'views/Auth/SignIn.js';
import SignUp from 'views/Auth/WholesaleSignUp.js';
import SignUpProducer from 'views/Auth/SignUpProducer.js';

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
        path: '/contracts',
        name: 'Contracts',
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: ProducerContracts,
        layout: '/producer',
      },
      {
        path: '/comands',
        name: 'Comands',
        icon: <CreditIcon color='inherit' />,
        secondaryNavbar: true,
        component: ProducerComands,
        layout: '/producer',
      },
    ],
  },

  {
    name: 'My account',
    category: 'account',
    rtlName: 'صفحات',
    state: 'pageCollapse',
    views: [
      {
        path: '/signin',
        name: 'Sign In',
        rtlName: 'لوحة القيادة',
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: '/auth',
      },
      {
        path: '/signup-wholesale',
        name: 'Sign Up',
        rtlName: 'لوحة القيادة',
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: '/auth',
      },
      {
        path: '/signup-producer',
        name: 'Sign Up',
        rtlName: 'لوحة القيادة',
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUpProducer,
        layout: '/auth',
      },
    ],
  },
];
export default dashRoutes;
