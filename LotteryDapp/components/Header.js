import truncateEthAddress from 'truncate-eth-address'

import { useAppContext } from '../context/context'
import style from '../styles/Header.module.css'
import ConnectWalletBtn from './ConnectWalletBtn'
import UserCard from './UserCard'

const Header = () => {
  // TODO: Get the connectWallet and address from context.
  const { connectWallet, address} = useAppContext()
  // TODO: Replace the static address with the currently logged in user.
 
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Lottery Dapp 💰</div>
      {/* TODO: Conditionally render connect button if no user is logged in. */}
      {/* TODO: pass in the address to the userCard */}
      {/* TODO: pass in the connect Wallet function to the connect Wallet Button. */}
      
      {/* if there is an address(dynamacillay), means there is user loggedin
      --> the show the useraddress card otherwise shows connectwallet */ }

      {address ? (<UserCard address = {address} />) :(<ConnectWalletBtn connectWallet={connectWallet} />)}
    </div>
  )
}
export default Header
