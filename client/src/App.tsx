import './index.scss';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import { createClient, Provider } from 'urql';
import { Maintenance } from './components/maintenance';
import { PayMaintenance } from './components/Payment/payMaintenance';
import { Header } from './components/Header/header';
import { MaintenanceHistory } from './components/History/maintenanceHistory';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route
            path="paymaintenance/:id/:flatNo/:email"
            element={<PayMaintenance />}
          />
          <Route path="history" element={<MaintenanceHistory />} />
          <Route path="/header" element={<Header />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
