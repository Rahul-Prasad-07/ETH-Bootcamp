import { ChevronDownIcon } from "@heroicons/react/outline";
import { useContext } from "react";

import { TransactionContext } from "../context/context";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const {connectWallet, currentAccount} = useContext(TransactionContext);
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src='../assets/venmo-logo.svg' alt="Venmo Logo" className={styles.logoImage}/>
        </div>
        
        {currentAccount? (
          <div className={styles.actionsContainer}>
          <p>
            Hello, <span className={styles.accentColor}>
              UserAddress!</span>👋🏻
          </p>
          <ChevronDownIcon className={styles.arrowDownIcon } />
          <div className={styles.avatarContainer}>
            <img className={styles.avatarImage} src='https://avatars.githubusercontent.com/u/99068989?v=4' alt="" />
          </div>
        </div>
        ):(

          <button className={styles.connectBtn} onClick={connectWallet}> Connect Wallet</button>

        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
