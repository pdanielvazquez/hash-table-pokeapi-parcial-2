import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Pokemon from './Pokemon'

// Importación de estilos de admintlte y bootstrap
import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Importación de jquery y scripts de admintlte
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

function App() {

  return (
    <>
      <Pokemon />
    </>
  )
}

export default App