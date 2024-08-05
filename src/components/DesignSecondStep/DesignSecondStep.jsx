import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Index";
import ColorThief from "colorthief";
import styles from "./DesignSecondStep.module.css";
import useStore from "../../shared/store";

function DesignSecondStep({ srcImage }) {
  const imgRef = useRef(null);
  const { setSecond } = useStore();
  const [palette, setPalette] = useState([]);
  useEffect(() => {
    const img = imgRef.current;
    const colorThief = new ColorThief();

    const handleLoad = () => {
      const colors = colorThief.getPalette(img, 6);
      setPalette(colors);
    };

    img && img.addEventListener("load", handleLoad);

    return () => {
      img && img.removeEventListener("load", handleLoad);
    };
  }, []);
  const handleRemoveColor = (indexToRemove) => {
    setPalette(palette.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <button
            className={styles.card__btn_close}
            onClick={() => {
              if (palette.length < 4) setSecond(false);
            }}
          >
            <Icon id="#close" className={styles.close__icon} />
          </button>
          <div className={styles.card__content}>
            <div className={styles.card__info}>
              <h2 className={styles.card__title}>
                Этот продукт имеет ограничение по цвету
              </h2>
              <p className={styles.card__text}>
                Этот продукт позволяет использовать только 3 цвета.
              </p>
            </div>
            <img
              className={styles.card__image2}
              src={srcImage}
              alt=""
              ref={imgRef}
            />
            <div className={styles.card__colors}>
              {palette.map((color, index) => (
                <div className={styles.card__color} key={index}>
                  <span
                    className={styles.card__color_span}
                    style={{
                      backgroundColor: `rgb(${color.join(",")})`,
                    }}
                  ></span>
                  {/* <h4 className={styles.card__color_code}>Yellow C</h4> */}
                  <span onClick={() => handleRemoveColor(index)}>
                    <button className={styles.card__color_btn}>
                      <Icon id="#delete" className={styles.delete__icon} />
                    </button>
                  </span>
                </div>
              ))}

              {/* <div style={{ display: "flex", marginTop: "10px" }}>
                {palette.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "400px",
                      height: "64px",
                      backgroundColor: `rgb(${color.join(",")})`,
                      marginRight: "10px",
                      cursor: "pointer",
                      borderRadius: "12px",
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
              </div> */}
              {/* <div className={styles.card__color}>
                <span className={styles.card__color_span}></span>
                <h4 className={styles.card__color_code}>Yellow C</h4>
                <span>
                  <button className={styles.card__color_btn}>
                    <Icon id="#delete" className={styles.delete__icon} />
                  </button>
                </span>
              </div>
              <div className={styles.card__color}>
                <span className={styles.card__color_span}></span>
                <h4 className={styles.card__color_code}>376 C</h4>
                <span>
                  <button className={styles.card__color_btn}>
                    <Icon id="#delete" className={styles.delete__icon} />
                  </button>
                </span>
              </div>
              <div className={styles.card__color}>
                <span className={styles.card__color_span}></span>
                <h4 className={styles.card__color_code}>326 C</h4>
                <span>
                  <button className={styles.card__color_btn}>
                    <Icon id="#delete" className={styles.delete__icon} />
                  </button>
                </span>
              </div>
              <div className={styles.card__color}>
                <span className={styles.card__color_span}></span>
                <h4 className={styles.card__color_code}>White C</h4>
                <span>
                  <button className={styles.card__color_btn}>
                    <Icon id="#delete" className={styles.delete__icon} />
                  </button>
                </span>
              </div> */}
            </div>
            {palette.length < 4 && (
              <button
                className={styles.card__btn}
                onClick={() => setSecond(false)}
              >
                Подтвердить
              </button>
            )}
          </div>
          <div className={styles.card__img}>
            <img className={styles.card__image} src={srcImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignSecondStep;
