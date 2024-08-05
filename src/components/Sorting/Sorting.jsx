import React from 'react'
import styles from './Sorting.module.css'

function Sorting() {
  return (
    <>
    <div className={styles.container}>
    <div className={styles.select}>
        <ul className={styles.select__options}>
            <li><button className={styles.select__option}>По новинкам</button></li>
            <li><button className={styles.select__option}>По популярности</button></li>
            <li><button className={styles.select__option}>По возрастанию цены</button></li>
            <li><button className={styles.select__option}>По убыванию цены</button></li>
        </ul>
    </div>
    </div>
    </>
  )
}

export default Sorting