import React, { useState, useEffect } from "react";
import styles from './lastseen.module.css';
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import useStore from "../../shared/store";
import { getGroupProducts } from "../../shared/api";
import { getImageGiftsUrl } from "../../shared/api";

export const LastSeen = () => {

  const { lastseen, setLastseen } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!(lastseen.length > 0)) {
      const storedLastseen = JSON.parse(localStorage.getItem('lastseen'));
      if (storedLastseen) {
        setLastseen(storedLastseen);
      }
      getGroupProducts(storedLastseen).then((data) => {
        setProducts(data);
      })
    }
  }, []);

  return (
    <section className={styles.seen}>
      {products && products.length > 0 && <div className={styles.seen__title}>Вы смотрели</div>}
      <ul className={styles.seen__content}>
        {products && products.map((item, index) => {
          return <li className={styles.seen__element} key={index} >
            <LastSeenCard
              srcImage={item.catalog === 'gifts' ? getImageGiftsUrl(item.images.big) : item.images.big}
              productName={item.fullname}
              productNumber={item.code}
              id={item.id}
              newPrice={item.price}
            />
          </li>
        })}
      </ul>
    </section>
  );
};

