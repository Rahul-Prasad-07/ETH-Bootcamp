import Navbar from './components/Navbar';
import styles from './styles/App.module.css';
import TransactionForm from './components/transaction/TransactionForm.jsx';

import './App.css';

function App() {
  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar/>
      </header>

      <main className={styles.mainConatiner}>
        <div className={styles.activityContainer}>{/* Activity */}</div>
        <div className={styles.sideConatiner}>
          <TransactionForm/>
        </div>
        </main>
    </div>
  );
}

export default App;
