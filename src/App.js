import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './style.css'
import './Mobile.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'

function App() {
  console.log = console.warn = console.error = () => {};
 

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* {base_url} */}
          {/* <Header/> */}
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
