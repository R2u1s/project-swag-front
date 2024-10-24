import React from 'react';
import './tab.css';

export const Tab: React.FC<
    React.PropsWithChildren<{
        active: boolean;
        value: string;
        onClick: (value: string) => void;
        classDefault:string,
        classActive:string
    }>
> = ({ active, value, children, onClick: handleClick, classDefault, classActive }) => {

    const onClick = React.useCallback(() => {
        if (typeof handleClick === 'function') {
            handleClick(value);
        }
    }, [handleClick, value]);

    return (
        <div className={`${classDefault} ${active ? classActive : ""}`} onClick={onClick}>
            {children}
        </div>
    );
};
