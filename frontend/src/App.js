import './css/App.css';
import AuthProvider from "./provider/AuthProvider";

import Navbar from './components/Navbar';
import Footer from './components/Rodape';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Footer />
    </AuthProvider>
  );
}

export default App;
