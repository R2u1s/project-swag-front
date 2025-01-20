import React, { useState } from 'react';
import styles from './dropdown.module.css'; // Импортируем стили

interface DropdownProps {
  text: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  textStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({ text, icon, content,textStyle, iconStyle, highlight = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={styles.dropdown__container}
        onClick={toggleDropdown}
      >
        <span className={`${styles.dropdown__text} ${highlight ? styles.dropdown_highlight : ''}`} style={textStyle}>
          {text}
        </span>
        <span className={`${styles.dropdown__icon} ${isOpen ? styles.dropdown__icon_open : ''} ${highlight ? styles.dropdown_highlight : ''}`} style={iconStyle}>
          {icon}
        </span>
      </div>
      <div className={`${styles.dropdown__content} ${isOpen ? styles.dropdown__content_open : ''}`}>
        {content}
      </div>
    </div>
  );
};

export default Dropdown;