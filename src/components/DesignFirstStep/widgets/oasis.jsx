import React from 'react';

const OasisBrandingWidget = ({id}) => {

 /*  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Создаем элемент для подключения стилей
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@oasis-catalog/branding-widget@^1/client/style.css';
    document.head.appendChild(link);

    // Флаг для отслеживания загрузки скрипта
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@oasis-catalog/branding-widget@^1/client/index.iife.js';
    script.async = true;

    script.onload = () => {
      console.log('flag');
      setIsScriptLoaded(true); // Устанавливаем состояние после загрузки скрипта
    };

    document.body.appendChild(script);

    // Чистим ресурсы при размонтировании компонента
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      console.log('build');
    };
  }, []); */

  return (
    <div>
      {true ? (
        <div className="js--oasis-branding-widget" data-product-id={id}></div>
      ) : (
        <div>Загрузка виджета...</div> // Загрузка контента
      )}
      <form id="oasis-branding-widget-form" method="post">
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default OasisBrandingWidget;