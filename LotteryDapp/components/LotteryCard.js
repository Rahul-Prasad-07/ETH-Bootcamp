import truncateEthAddress from 'truncate-eth-address'

import { useAppContext } from '../context/context'
import style from '../styles/PotCard.module.css'

const LotteryCard = () => {
  // TODO: Get the data needed from context
  const {enterLottery, lotteryPot,pickWinner,lastWinner } = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        {/* TODO: Dynamically render the lotteryID */}
        Lottery <span className={style.textAccent}>#1</span>
      </div>
      <div className={style.pot}>
        {/* TODO: Dynamically render the lottery pot */}
        Pot 🍯: <span className={style.goldAccent}>{lotteryPot}</span>
      </div>

      <div className={style.recentWinnerTitle}>🏆Last Winners🏆</div>
      {!lastWinner.length ? (
        <div className={style.winner}>No Winner yet!</div>
      ):(
      <div className={style.winner}>
        {/* TODO: Dynamically render the last winner */}
        {truncateEthAddress(lastWinner[lastWinner.length-1])}
      </div>
      )}
      {/* TODO: Add onClick functionality to the buttons */}
      <div className={style.btn} onClick={enterLottery}>Enter</div>
      <div className={style.btn} onClick={pickWinner}>Pick Winner!</div>
    </div>
  )
}
export default LotteryCard
