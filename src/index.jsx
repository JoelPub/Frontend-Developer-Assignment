import { StrictMode } from 'react';
import { createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);