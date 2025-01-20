/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./PriceSlider.css";
import useStore from "../../shared/store";

const PriceSlider = ({min,max,symbol}) => {
  const { setOffcetPrice } = useStore();
  const [values, setValues] = useState([min, max]);
  const STEP = 1;

  const trackBackground = getTrackBackground({
    values,
    colors: ["#ccc", "#6B3EB2", "#ccc"],
    min: min,
    max: max,
  });
  useEffect(() => {
    setOffcetPrice({
      start: values[0],
      end: values[1],
    });
  }, [values]);

  return (
    <div className="slider-container">
      <div className="values">
        <output className="value">{values[0]} {symbol}</output>
        <output className="value">{values[1]} {symbol}</output>
      </div>
      <Range
        values={values}
        step={STEP}
        min={min}
        max={max}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="track"
            style={{ ...props.style }}
          >
            <div
              ref={props.ref}
              className="track-inner"
              style={{ background: trackBackground }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="thumb" style={{ ...props.style }}>
            <div className="thumb-inner" />
          </div>
        )}
      />
    </div>
  );
};

export default PriceSlider;
