import styles from './description.module.css';
import React, { useState } from "react";
import { Tab } from '../tab/tab';
import { FilesTab } from '../files_tab/files_tab';

const TABS = {
	description: "Описание товара",
	design: "Дизайн",
	delivery: "Доставка",
	files: "Файлы"
}

const Description = ({ data }) => {

	// const lengthDesc = data.content.split(" ").length / 2;
	// const firstDesc = data.content.split(" ").slice(0, lengthDesc);
	// const lastDesc = data.content.split(" ").slice(lengthDesc);

	const [tab, setTab] = useState(TABS.description);

	const onTabClick = (value) => {
		setTab(value);
	}

	const tabContent = (curTab) => {
		switch (curTab) {
			case TABS.description:
				return (
					<div className={styles.description__text}>
						<div dangerouslySetInnerHTML={{ __html: data.content }} />
					</div>
				)
			case TABS.design:
				return (
					<div className={styles.description__text}>
						<p>Нет информации</p>
					</div>
				)
			case TABS.delivery:
				return (
					<div className={styles.description__text}>
						<p>Нет информации</p>
					</div>
				)
			case TABS.files:
				return (
					<FilesTab id={data.id} />
				)
			default:
				<div className={styles.description__text}>
					<p>Нет информации</p>
				</div>
		}
	}

	return (
		<section className={styles.description}>
			<div className={styles.description_nav}>
				{Object.entries(TABS).map(([key]) => {
					return <>
						<Tab
							active={tab === TABS[key]}
							value={TABS[key]}
							onClick={onTabClick}
							classDefault={styles.description__btn}
							classActive={styles.description__btn_active}
						>
							{TABS[key]}
						</Tab>
					</>
				})}
			</div>
			{tabContent(tab)}
		</section>
	);
};
export default Description;
