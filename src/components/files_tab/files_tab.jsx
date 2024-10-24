import { getFiles } from '../../shared/api';
import styles from './files_tab.module.css';
import React, { useState, useEffect } from "react";
import useStore from "../../shared/store";
import Loading from '../Loading/Index';

export const FilesTab = ({ id }) => {

	const [files, setFiles] = useState([]);
	const { loader, setLoader } = useStore();

	useEffect(() => {
		setLoader(true);
		getFiles(id).then((data) => {
			if (data.cdr) {
				if (data.cdr !== null) {
					setFiles(data.cdr.split(','));
					setLoader(false);
				}
			}
		}).finally(() => {
			setLoader(false);
		}
		);

	}, [id]);

	const renderFile = (url) => {
		const extension = url.split('.').pop();

		return <a href={url} className={styles.files__link} download>Файл .<span className={styles.files__extension}>{extension.toLowerCase()}</span></a>;
	};

	return (
		<ul className={styles.files}>
			{loader && <Loading />}
			{files && files.length !== 0 ? files.map((item, index) => {
				return <li className={styles.files__element} key={index}>
					{renderFile(item)}
				</li>
			}) :
				<span className={styles.files__text}>Не найдено для данного товара</span>}
		</ul>
	);
};
