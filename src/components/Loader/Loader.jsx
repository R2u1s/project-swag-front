import React, { useState, useEffect } from 'react';

const Loader = ({name}) => {
    const [progress, setProgres] = useState(0);
    const [showName, setShowName] = useState(true);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setProgres(progress + 1);
      }, 100);
  
      if (progress === 100) {
        clearTimeout(timeout);
        setShowName(false);
      }
    }, [progress]);

  return (
    <>
    {!showName? (
    <div style={{ width: '100%', height: '60px', border: '1px solid #94C0D4', position: 'relative', borderRadius: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span
        style={{
          textAlign: 'center',
          margin: 'auto',
          transition: 'width 0.1s ease-in-out', // Анимация изменения ширины
          borderRadius: '92px',
          zIndex: 2,
        }}
      >
        Файл: {name}
      </span>
      <span
          style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#94C0D4',
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'center',
          margin: 'auto',
          transition: 'width 0.1s ease-in-out', // Анимация изменения ширины
          borderRadius: '92px',
        }}
      ></span>
    </div>
    ): (
    <div style={{ width: '100%', height: '60px', border: '1px solid #94C0D4', position: 'relative', borderRadius: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span
        style={{
          textAlign: 'center',
          margin: 'auto',
          transition: 'width 0.1s ease-in-out', // Анимация изменения ширины
          borderRadius: '92px',
          zIndex: 2,
        }}
      >
        {`${progress}%`}
      </span>
      <span
          style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#94C0D4',
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'center',
          margin: 'auto',
          transition: 'width 0.1s ease-in-out', // Анимация изменения ширины
          borderRadius: '92px',
        }}
      ></span>
    </div>      
    )}
    </>
  );
};

export default Loader;