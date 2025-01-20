import React, { useState, useEffect, Suspense } from 'react';

const SvgIcon = ({ name, ...props }) => {
  const [svgUrl, setSvgUrl] = useState('');

  useEffect(() => {
    const importSvg = async () => {
      try {
        const svg = await import(`../../images/${name}.svg`);
        setSvgUrl(svg.default || svg);
      } catch {
        setSvgUrl('');
      }
    };

    importSvg();
  }, [name]);

  if (!svgUrl) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <img src={svgUrl} alt={name} {...props} style={{width:"16px", height:"16px"}} />
    </Suspense>
  );
};

export default SvgIcon;