import Navbar from './components/Navbar';
import styles from './styles/App.module.css';

import './App.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar/>
      </header>
    </div>
  );
}

export default App;
