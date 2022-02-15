import React from 'react';
import GlobalModalProvider from './HOC/GlobalModalProvider';
import GlobalThemeProvider from './HOC/GlobalThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/initStore.js';
import Home from './Layouts/Home';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <GlobalThemeProvider>
            <GlobalModalProvider>
              <Home />
            </GlobalModalProvider>
          </GlobalThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
