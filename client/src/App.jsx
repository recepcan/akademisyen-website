import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout/Layout';

function App() {
  return (
    <div className="min-h-screen relative flex justify-center">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
