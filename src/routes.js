// import

// General Components
import LocalFarmers from 'views/General/LocalFarmers/index.js';

// Wholesale Components
// import LocalFarmers from 'views/Wholesale/LocalFarmers';
import WholesaleProfile from 'views/Wholesale/Profile';
import Contracts from 'views/Wholesale/Contracts';
import Comands from 'views/Wholesale/Comands';

// Producer Components
import ProducerProfile from 'views/Wholesale/Profile';
import ProducerContracts from 'views/Producer/Contracts';
import ProducerComands from 'views/Producer/Comands';

// AUTH ROUTES';
import SignIn from 'views/Auth/SignIn.js';
import SignUp from 'views/Auth/WholesaleSignUp.js';
import SignUpProducer from 'views/Auth/SignUpProducer.js';

import ProducerDetails from 'views/General/ProducerDetails';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from 'components/Icons/Icons';
import ProducersMap from 'views/Wholesale/ProducersMap';

var dashRoutes = [
  {
    path: '/producers',
    name: 'Local Farmers',
    icon: <HomeIcon color="inherit" />,
    component: LocalFarmers,
    layout: '/wholesale',
  },
  {
    path: '/producer-map',
    name: 'Producer Map',
    icon: <RocketIcon color="inherit" />,
    component: ProducersMap,
    layout: '/wholesale',
  },
  {
    path: '/producer/:producerId',
    name: 'Local Farmers',
    hidden: true,
    icon: <HomeIcon color="inherit" />,
    component: ProducerDetails,
    layout: '/wholesale',
  },
  {
    name: 'My Account',
    category: 'wholesale-account',
    state: 'pageCollapse',
    views: [
      {
        path: '/profile',
        name: 'My shop account',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: WholesaleProfile,
        layout: '/wholesale',
      }/* ,
      {
        path: '/contracts',
        name: 'Contracts',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Contracts,
        layout: '/wholesale',
      } */,
      {
        path: '/comands',
        name: 'Commands',
        icon: <CreditIcon color="inherit" />,
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
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: ProducerProfile,
        layout: '/producer',
      }/* ,
      {
        path: '/contracts',
        name: 'Contracts',
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: ProducerContracts,
        layout: '/producer',
      } */,
      {
        path: '/comands',
        name: 'Comands',
        icon: <CreditIcon color="inherit" />,
        secondaryNavbar: true,
        component: ProducerComands,
        layout: '/producer',
      },
    ],
  },

  {
    name: 'My account',
    category: 'account',
    rtlName: '??????????',
    state: 'pageCollapse',
    views: [
      {
        path: '/signin',
        name: 'Sign In',
        rtlName: '???????? ??????????????',
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: '/auth',
      },
      {
        path: '/signup-wholesale',
        name: 'Sign Up',
        rtlName: '???????? ??????????????',
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: '/auth',
      },
      {
        path: '/signup-producer',
        name: 'Sign Up',
        rtlName: '???????? ??????????????',
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUpProducer,
        layout: '/auth',
      },
    ],
  },
];
export default dashRoutes;
