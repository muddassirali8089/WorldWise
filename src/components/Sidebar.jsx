import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet/>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copy Right {new Date().getFullYear()} by Muddassir Ali.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
