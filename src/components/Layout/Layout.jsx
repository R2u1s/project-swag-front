import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import useStore from "../../shared/store";
import { getCatalog } from "../../shared/api";

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
    request(0, 10);
  }, []);
  return (
    <>
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
