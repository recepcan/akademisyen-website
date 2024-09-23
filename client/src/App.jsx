import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout/Layout';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen relative flex justify-center">
      <Router>
      <ScrollToTop/>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
