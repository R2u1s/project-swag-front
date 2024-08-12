import React from "react";
import styles from './OrderCard.module.css'

function OrderCard({productName, srcImage, productCirculation, price}) {

  return (
    <>
    <div className={styles.order__card}>
        <img className={styles.order__card_img} src={srcImage} alt="" />
        <div className={styles.order__card_content}>
            <h5 className={styles.order__card_title}>{productName}</h5>
            <div className={styles.order__card_circulation}>
                Тираж: <span>{productCirculation} шт.</span>
            </div>
            <div className={styles.order__card_price}>{price}</div>
        </div>
    </div>
    </>
  )
}

export default OrderCard