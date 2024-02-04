import { AnchorProvider , BN , Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { MINIMUM_REMAINING_TIME_UNTIL_EXPIRY ,PROGRAM_ID } from "./constants";

//Create a function that gets a solana program we created

export const getProgram = (connection , wallet) => {
    const IDL = require("./idl.json");
    const provider = new AnchorProvider(connection, wallet , AnchorProvider.defaultOptions());
    const program = new Program(IDL , PROGRAM_ID , provider);
    return program;
}

const getProgramAccountPk = async(seeds)=>{
    return (await PublicKey.findProgramAddress(seeds,PROGRAM_ID))[0];
}

export const getMasterAccountPk = async() =>{
    return await getProgramAccountPk([Buffer.from("master")]);
}

export const getBetAccountPk = async(id) =>{
    return await getProgramAccountPk([
        Buffer.from("bet"),
        new BN(id).toArrayLike(Buffer , "le" , 8)
    ])
}

export const getCanEnterBet = (bet) => {
    return (
      !!bet.state.created &&
      bet.expiryTs - MINIMUM_REMAINING_TIME_UNTIL_EXPIRY > getUnixTimestamp()
    );
  };

export const getStockName = (priceKey)=>{
    switch(priceKey){
        case "E4m5GPq53mayAxMSH8NwPuC75m83mQ47zpdtNDtxVzPf":
        return "AMC";
        
        case "5yixRcKtcs5BZ1K2FsLFwmES1MyA92d6efvijjVevQCw":
        return "AAPL";

        case "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J":
        return "BTC";

        case "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB":
        return "ETH";

        case "dZsHZaX1xYQE35pNNdnDYTYMkU6q1abz1xKw2sSg1XU":
        return "AMZN";

        case "CZDpZ7KeMansnszdEGZ55C4HjGsMSQBzxPu6jqRm6ZrU":
        return "GOOG";

        case "F42aKaaZR1CCbyiu6PXaz9WAgRUBHhUtSjHSmHwcwjM2":
        return "MSFT";

        case "2YDWKqoJ1jZgoirNC4c4WLj2JAAf8hxLz5A9HTmPG2AC":
        return "TSLA";
    }
}