import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

const ImageColorPalette = ({ imageUrl }) => {
  const imgRef = useRef(null);
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    const img = imgRef.current;
    const colorThief = new ColorThief();

    const handleLoad = () => {
      const colors = colorThief.getPalette(img, 6); // Извлечение до 6 цветов
      setPalette(colors);
    };

    img.addEventListener("load", handleLoad);

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleRemoveColor = (indexToRemove) => {
    setPalette(palette.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <img ref={imgRef} src={imageUrl} alt="source" crossOrigin="anonymous" />
      {/* {palette.length > 3 && ( */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        {palette.map((color, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "50px",
              height: "50px",
              backgroundColor: `rgb(${color.join(",")})`,
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleRemoveColor(index)}
          >
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "50%",
                padding: "2px 5px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              x
            </span>
          </div>
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

export default ImageColorPalette;
