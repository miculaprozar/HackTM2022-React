// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Configurator from 'components/Configurator/Configurator';
import Footer from 'components/Footer/Footer.js';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import routes from 'routes.js';
// Custom Chakra theme
import theme from 'theme/theme.js';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
export default function Dashboard(props) {
  const { ...rest } = props;

  const history = useHistory();

  useEffect(() => {
    console.log('useEffect');
    const userData = localStorage.getItem('userData');

    if (userData) {
      const user = JSON.parse(userData);
      if (user.roleId === 1) {
        history.push('/wholesale/profile');
      } else if (user.roleId === 2) {
        history.push('/producer/profile');
      }
    } else {
      history.push('/auth/signin');
    }
  }, []);
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    console.log('IS THIS WORKING');
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'producer-account') {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/producer') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = 'ltr';
  // Chakra Color Mode

  const getProducerRoutes = (routes) => {
    return routes.filter((route) => {
      return (
        route.layout === '/producer' || route.category === 'producer-account'
      );
    });
  };
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={getProducerRoutes(routes)}
        logoText={'PURITY UI DASHBOARD'}
        display='none'
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        w={{
          base: '100%',
          xl: 'calc(100% - 275px)',
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={'PURITY UI DASHBOARD'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from='/admin' to='/admin/dashboard' />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant('opaque')}
          onTransparent={() => setSidebarVariant('transparent')}
        />
      </MainPanel>
    </ChakraProvider>
  );
}
