import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import useStore from "../../shared/store";
import { getCatalog } from "../../shared/api";
import { GlobalStyles } from '@mui/material';

function Layout() {
  const { setItems, setLoader, setSearch } = useStore();
  const request = (start, end) => {
    setLoader(true);
    getCatalog(start, end)
      .then((data) => {
        setItems(data);
        setSearch(false);
      })
      .finally(() => setLoader(false));
  };
  useEffect(() => {
    request(10, 1);
  }, []);
  return (
    <>
      <GlobalStyles styles={{ body: { overflowY: 'scroll !important' } }} />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header />
          <ScrollToTop />
          <Outlet />
        </div>
        <Footer />
      </div>

    </>
  );
}

export default Layout;
