import React, { useState } from 'react';
import styles from "./checkbox.module.css";

interface CustomCheckboxProps {
    label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const toggleCheckbox = () => {
        setChecked(prevChecked => !prevChecked);
    };

    return (
        <div className={`${styles.checkbox__container} ${checked && styles.checkbox__container_active}`} onClick={toggleCheckbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={toggleCheckbox}
                id="custom-checkbox"
                style={{ display: 'none' }} // Скрываем стандартный чекбокс
            />
            <label htmlFor="custom-checkbox">{label}</label>
            <div className={`${styles.checkbox} ${checked && styles.checkbox_active}`}>
                {checked && (
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 11L11 15L17 8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default CustomCheckbox;