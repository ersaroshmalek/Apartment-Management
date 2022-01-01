import './index.scss';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import { createClient, Provider } from 'urql';
import { Maintenance } from './components/maintenance';

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
