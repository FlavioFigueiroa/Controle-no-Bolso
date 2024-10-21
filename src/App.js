import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Despesas from './components/pages/Despesas';
import MetasFinanceiras from './components/pages/MetasFinanceiras';
import Infos from './components/pages/Infos';
import DespesasCriadas from './components/pages/DespesasCriadas';
import Despesa from './components/pages/Despesa'

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass='min-height'>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/despesas' element={<Despesas/>} />
            <Route path='/metas-financeiras' element={<MetasFinanceiras/>} />
            <Route path='/infos' element={<Infos/>} />
            <Route path='/despesasCriadas' element={<DespesasCriadas/>} />
            <Route path='/despesa/:id' element={<Despesa/>}/>
        </Routes>
      </Container>
        <Footer />
    </Router>
  );
}

export default App;
