
import './css/App.css';
import Sidebar from './components/sidebar';
import Mainpart from './components/mainpart';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// import Login from './components/login';

function App() {
  return (
    <>
    <div className="app">
      
      <Router>
      <Sidebar />
      <Mainpart />
      </Router>
      
      
      
      
    </div>
    </>
  
  );
}

export default App;
