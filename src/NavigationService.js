import {
  NavigationActions,
  StackActions,
  SwitchActions,
  DrawerActions,
} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function NavigationAction(
  routeAction: string,
  routeName: string,
  params,
  key = null,
) {
  let action = null;

  switch (routeAction) {
    case 'navigate':
      action = NavigationActions.navigate({
        routeName,
        params,
      });
      break;
    case 'back':
      action = NavigationActions.back({key});
      break;
  }
  _navigator.dispatch(action);
}

function StackAction(routeAction: string, routeName: string, params, n = 0) {
  let action = null;

  switch (routeAction) {
    case 'push':
      action = StackActions.push({
        routeName,
        params,
      });
      break;
    case 'pop':
      action = StackActions.pop({n});
      break;
    case 'popToTop':
      action = StackActions.popToTop();
      break;
    case 'reset':
      action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName})],
      });
      break;
  }
  _navigator.dispatch(action);
}

function SwitchAction(routeAction: string, routeName: string, params) {
  let action = null;

  switch (routeAction) {
    case 'jumpTo':
      action = SwitchActions.jumpTo({
        routeName,
        params,
      });
      break;
  }
  _navigator.dispatch(action);
}

function DrawerAction(routeAction: string) {
  let action = null;

  switch (routeAction) {
    case 'openDrawer':
      action = DrawerActions.openDrawer();
      break;
    case 'closeDrawer':
      action = DrawerActions.closeDrawer();
      break;
    case 'toggleDrawer':
      action = DrawerActions.toggleDrawer();
      break;
  }
  _navigator.dispatch(action);
}

export default {
  NavigationAction,
  StackAction,
  SwitchAction,
  DrawerAction,
  setTopLevelNavigator,
};
