import React from 'react'
import styles from './Services.module.css'

function Services() {
  return (
    <>
    <div className={styles.services}>
        <div className={styles.services__info}>
            <h2 className={styles.services__title}>Один мерч и сотни историй</h2>
            <p className={styles.services__description}>Выбирайте решение, которое подойдет под бизнес-задачу или событие.</p>
        </div>
        <div className={styles.services__content}>
            <div className={styles.services__card} id={styles.services__card1}>
                <div className={styles.services__card_info}>
                    <h4 className={styles.services__card_title}>HR-коммуникации</h4>
                    <p className={styles.services__card_text}>Используйте корпоративный мерч для повышения лояльности сотрудников. Создавайте позитивные коммуникации, поощряйте и объединяйте коллег.</p>
                </div>
                <div className={styles.services__card_img}>
                    <img className={styles.services__card1_img1} src="/images/services_card1_bag.png" alt="" />
                    <img className={styles.services__card1_img2} src="/images/services_card1_shirt.png" alt="" />
                    <img className={styles.services__card1_img3} src="/images/services_card1_coffee.png" alt="" />
                </div>
            </div>
            <div className={styles.services__card} id={styles.services__card2}>
                    <h4 className={styles.services__card_title}>Конференции и мероприятия</h4>
                    <div className={styles.services__card2_info}>
                        <p className={styles.services__card2_text}>Становитесь заметнымина выставках и промо-мероприятиях</p>
                        <p className={styles.services__card2_text}>Создавайте положительные эмоции и ассоциации</p>
                    </div>
            </div>
            <div className={styles.services__card} id={styles.services__card3}>
                <div className={styles.services__card_info}>
                    <h4 className={styles.services__card_title}>Бизнес-подарки</h4>
                    <p className={styles.services__card_text}>Дарите креативные подарки партнерам, выражайте признательность и укрепляйте деловые отношения.</p>
                </div>
                <div className={styles.services__card_img}>
                    <img className={styles.services__card3_img} src="/images/services_card3_box.png" alt="" />
                </div>
            </div>
            <div className={styles.services__card} id={styles.services__card4}>
                <h4 className={styles.services__card_title}>Рекламные компании</h4>
                <p className={styles.services__card4_text}>Распространяйте сувениры, привлекайте внимание к бренду, увеличивая его узнаваемость и популярность</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Services