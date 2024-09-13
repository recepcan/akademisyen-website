import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/lib/integration/react.js'
import ThemeProvider from './Components/ThemeProvider.jsx'
createRoot(document.getElementById('root')).render(
 <PersistGate persistor={persistor}>
  <Provider store={store}>
  <ThemeProvider>
    <App />
    </ThemeProvider>
  </Provider>
  </PersistGate>,
)
