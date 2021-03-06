import React from 'react';
import GlobalModalProvider from './HOC/GlobalModalProvider';
import GlobalThemeProvider from './HOC/GlobalThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/initStore';
import RootRouter from './Route/ReactRouter';
import GlobalToastProvider from './HOC/GlobalToastProvider';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <BrowserRouter>
            <GlobalThemeProvider>
              <GlobalModalProvider>
                <GlobalToastProvider>
                  <RootRouter />
                </GlobalToastProvider>
              </GlobalModalProvider>
            </GlobalThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
