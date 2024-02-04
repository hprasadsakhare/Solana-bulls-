import React, { useContext, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {BsLinkedin} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsStackOverflow} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs';
import {SiLeetcode} from 'react-icons/si'
import {SiCodingninjas} from 'react-icons/si'

const styles = {
  container: "flex w-screen h-16 bg-black px-4 py-3 mb-5 fixed",
  leftHeader: "flex flex-1 text-white items-center mt-10 ",
  searchWrapper: "flex flex-1",
  searchInputContainer:
    "text-white items-center flex flex-1 -ml-64 border border-gray-400 mr-12 hover:bg-[#1E2123] duration-300 p-3 rounded-lg",
  searchIcon: "text-gray-400 text-3xl mr-3",
  searchInputWrapper: "text-gray-400 w-full",
  searchInput: "bg-transparent outline-none",
  rightHeader: "flex items-center justify-end text-white gap-8",
  menuItem: "cursor-pointer font-bold hover:text-green-500 duration-300 ",
};

const Header = () => {

  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}><Image src={logo} width={90} height={90}/></div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
      
     
      
        <WalletMultiButton className="bg-cyan-200 text-black hover:text-white transition-all ease-in duration-100"/>
      </div>
    </div>
  );
};

export default Header;
