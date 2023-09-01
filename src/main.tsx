import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import zhCN from 'antd/locale/zh_CN';
import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import store from './store/index.ts';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ConfigProvider>
  // </React.StrictMode>,
)
