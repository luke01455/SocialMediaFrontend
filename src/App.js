import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import MenuBar from './components/menu-bar'

import { AuthProvider } from './context/auth'
 
import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App
