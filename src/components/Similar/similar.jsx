import React, { useState, useEffect } from "react";
import styles from './similar.module.css';
import LastSeenCard from "../LastSeenCard/LastSeenCard";
import useStore from "../../shared/store";
import { categoryCatalog, findSimilarProducts } from "../../shared/api";
import { getImageGiftsUrl } from "../../shared/api";

export const Similar = ({id}) => {

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    findSimilarProducts(id)
    .then((data) => {
      setGoods(data);
    })
    .catch(error => console.log(error))
  }, []);

  return (
    <section className={styles.seen}>
      <div className={styles.seen__title}>Похожие товары</div>
      <span className={styles.similar__text}>
        Посмотрите что мы для вас подобрали.
      </span>
      <ul className={styles.seen__content}>
        {goods && goods.map((item) => {
          return <li className={styles.seen__element} key={item.id} >
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

