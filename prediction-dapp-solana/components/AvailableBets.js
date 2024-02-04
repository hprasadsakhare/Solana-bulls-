import { useState, useContext, useEffect } from "react";
import { getStockName } from "../utils";
import { STOCKDATA } from "../data/asset.seed";
const styles = {
  button:
    "rounded-sm hover:bg-cyan-300 cursor-pointer transition-all duration-100 ease-in py-2 px-5 text-black text-xs font-bold bg-cyan-200",
  availableBetsContainer: "flex flex-col mt-4 border-t border-[#30363b] pt-2",
  availableBetsTitle: "text-cyan-300 font-bolder text-3xl mb-5  ",
  stockName: "text-[#ffffff] font-bolder text-lg ml-4",
  noAvailableBetsTitle: "text-[#ef4b09] font-bold text-sm ",
  BetResult:"text-purple-300",
  availableBetsItem:
    "flex flex-col justify-center space-y-2 items-center border-b border-[#30363b] py-3",
  currentStockPrice: "flex flex-col justify-center items-center",
  currentStockPriceTitle: "text-[8px] text-[#ffffff]",
  currentStockPriceAmount: "text-lg text-[#ffffff]",
};
// SOLANA STUFF
import { useGlobalState } from "../hooks";
import { getSolAmount, getCanEnterBet } from "../utils";
import { IoMdClose } from "react-icons/io";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const AvailableBets = ({
  setSelectedBet,
  setShowModal,
}) => {


  const {allBets ,closeBet ,claimBet} = useGlobalState()

  const staticCloseBet = () => {
    console.log("Closing bet")
  }
  const staticClaimBet = () => {
    console.log("Claiming bet")
  }

  return (
    <div className={styles.availableBetsContainer}>
      <p className={styles.availableBetsTitle}>Recent Bets</p>
      {allBets?.map((bet) => {
        return (
          <div
            key={bet.id.toString()}
            className={styles.availableBetsItem}
          > 
          <div className="flex w-full justify-between items-center">
            { Object.keys(bet.state)[0].toUpperCase()!="PLAYERAWON" && Object.keys(bet.state)[0].toUpperCase()!="PLAYERBWON" &&
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                STATUS
              </p>
              <p className={styles.currentStockPriceAmount}>{Object.keys(bet.state)[0].toUpperCase()}</p>
            </div>
            }
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                STOCK NAME
              </p>
              <p className={styles.currentStockPriceAmount}>{getStockName(bet.pythPriceKey.toString())}</p>
            </div>
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                AUTHORITY
              </p>
              <p className={styles.currentStockPriceAmount}>{bet.predictionA.player.toString().slice(0,4)}...{bet.predictionA.player.toString().slice(40)}</p>
            </div>
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                AUTHORITY&apos;S GUESS
              </p>
              <p className={styles.currentStockPriceAmount}>{bet.predictionA.price.toString()} $</p>
            </div>
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                CURRENT POT AMOUNT
              </p>
              <p className={styles.currentStockPriceAmount}>  {bet.predictionB?getSolAmount(bet.amount)*2:getSolAmount(bet.amount)} SOL</p>
            </div>
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                CHALLENGER
              </p>
              <p className={styles.currentStockPriceAmount}>{bet.predictionB?`${bet.predictionB.player.toString().slice(0,4)}...${bet.predictionB.player.toString().slice(40)}`:"N/A"}</p>
            </div>
            <div className={styles.currentStockPrice}>
              <p className={styles.currentStockPriceTitle}>
                CHALLENGER&apos;S GUESS
              </p>
              <p className={styles.currentStockPriceAmount}>{bet.predictionB?`${bet.predictionB.price.toString()} $`:"N/A"}</p>
            </div>

            { Object.keys(bet.state)[0].toUpperCase() == "CREATED" &&
            <IoMdClose className="hover:text-red-700 text-white cursor-pointer text-2xl mr-4"
              onClick={() => closeBet(bet)}
            />
            }
           </div>
            <div className="">
            {Object.keys(bet.state)[0].toUpperCase() == "STARTED" ?
              <div className={styles.button} onClick={() => claimBet(bet)}>
                CLAIM
              </div>
              : Object.keys(bet.state)[0].toUpperCase() == "PLAYERAWON" ?

                <div className={styles.BetResult}>
                  AUTHORITY WON
                </div>
                : Object.keys(bet.state)[0].toUpperCase() == "PLAYERBWON" ?
                  <div className={styles.BetResult}>
                    CHALLANGER WON 
                  </div>
                  : <div className={styles.button}
                    onClick={() => {
                      setSelectedBet(bet);
                      setShowModal(true);
                    }}>
                    ENTER
                  </div>}
            </div>
          {console.log(Object.keys(bet.state)[0].toUpperCase())}
          </div>
        );
      })}

      {allBets?.length === 0 && (
        <p className={styles.noAvailableBetsTitle}>No Available Bets</p>
      )}

    </div>
  );
}

export default AvailableBets
