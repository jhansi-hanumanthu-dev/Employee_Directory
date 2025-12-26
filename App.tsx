import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';

import { useAppLifecycle } from './src/hooks/useAppLifecycle';
import { saveUsersToStorage } from './src/utils/storage';
import { AppNavigator } from './src/navigation/AppNavigator';

function Root() {
  const users = useSelector((s: any) => s.users.list);

  useAppLifecycle(() => {
    saveUsersToStorage(users);
  });

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const App = ()=> {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
export default App;