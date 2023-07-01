import truncateEthAddress from 'truncate-eth-address'

import style from '../styles/TableRow.module.css'

const TableRow = ({ player }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.address}>{truncateEthAddress(player)}</div>
      <div className={style.ethAmmount}>
        <span className={style.goldAccent}>+0.1ETH</span>
      </div>
    </div>
  )
}
export default TableRow
