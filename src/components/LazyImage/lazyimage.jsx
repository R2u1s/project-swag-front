import React, { useState,useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, extraClass, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const imgElement = imgRef.current;

    const loadImage = () => {
      imgElement.src = src;
    };

    const handleLoadError = () => {
      setHasError(true);
    };

    const onIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(imgElement);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    imgElement.addEventListener('error', handleLoadError);

    if (!hasError) {
      observer.observe(imgElement);
    } else {
      // Retry loading if an error occurred
      loadImage();
    }

    return () => {
      if (observer && imgElement) {
        observer.unobserve(imgElement);
        imgElement.removeEventListener('error', handleLoadError);
      }
    };
  }, [src, hasError]);

  return <img ref={imgRef} className={extraClass} data-src={src} alt={alt} {...props} />;
};

export default LazyImage;