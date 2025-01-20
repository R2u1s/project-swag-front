import React, { useState } from 'react';
import styles from './color-circles.module.css';

type Color = {
    name: string;
    hex: string;
};

const colors = [
    { name: 'Белый', hex: '#FFFFFF' },
    { name: 'Чёрный', hex: '#000000' },
    { name: 'Серый', hex: '#808080' },
    { name: 'Бежевый', hex: '#f2e8c9' },
    { name: 'Красный', hex: '#FF0000' },
    { name: 'Зелёный', hex: '#008000' },
    { name: 'Синий', hex: '#0000FF' },
    { name: 'Жёлтый', hex: '#FFFF00' },
    { name: 'Оранжевый', hex: '#FFA500' },
    { name: 'Фиолетовый', hex: '#800080' },
    { name: 'Розовый', hex: '#FFC0CB' },
    { name: 'Коричневый', hex: '#964B00' },
    { name: 'Голубой', hex: '#00FFFF' },
    { name: 'Салатовый', hex: '#98FB98' },
    { name: 'Темно-красный', hex: '#8B0000' },
    { name: 'Темно-зелёный', hex: '#006400' },
    { name: 'Темно-синий', hex: '#00008B' },
    { name: 'Темно-оранжевый', hex: '#FF8C00' },
    { name: 'Темно-жёлтый', hex: '#9B870C' },
    { name: 'Темно-фиолетовый', hex: '#4B0082' },
    { name: 'Темно-розовый', hex: '#C71585' },
    { name: 'Темно-серый', hex: '#505050' },
  ];

const ColorCircles: React.FC = () => {
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);

    const handleCircleClick = (color: Color) => {
        setSelectedColors(prevSelectedColors => {
            if (prevSelectedColors.includes(color)) {
                // Удаление цвета
                return prevSelectedColors.filter(c => c !== color);
            } else {
                // Добавление цвета
                return [...prevSelectedColors, color];
            }
        });
    };

    return (
        <div className={styles.container}>
            {colors.map((color, index) => {
                const isSelected = selectedColors.includes(color);
                return (
                    <div
                        key={index}
                        title={color.name}
                        onClick={() => handleCircleClick(color)}
                        className={styles.circle}
                        style={{
                            backgroundColor: color.hex,
                            border: color.hex === '#FFFFFF' ? '2px solid #C0C0C0' : 'none',
                            transform: isSelected ? 'scale(1.3)' : undefined,
                            opacity: selectedColors.length > 0 && !isSelected ? 0.5 : 1,
                            zIndex: isSelected ? 1 : 0
                        }}
                    />
                );
            })}
        </div>
    );
};

export default ColorCircles;