import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import domtoimage from "dom-to-image";
import Download from "../xz3/Index";

const ResizableRotatableImage = ({ img, background }) => {
  const [image, setImage] = useState(null);
  const [bgImage, setBgImage] = useState(null); // Добавляем состояние для фонового изображения
  const [isSelected, setIsSelected] = useState(false);
  const [stageHeight, setStageHeight] = useState(450); // Начальная высота Stage
  const imageRef = useRef(null);
  const trRef = useRef(null);
  const stageRef = useRef(null); // Добавляем реф для Stage

  // Load background image
  useEffect(() => {
    const loadBgImage = new window.Image();
    loadBgImage.src = background;
    loadBgImage.onload = () => {
      setBgImage(loadBgImage);
    };
  }, [background]);

  // Load main image
  useEffect(() => {
    const loadImage = new window.Image();
    loadImage.src = img;
    loadImage.onload = () => {
      setImage(loadImage);
    };
  }, [img]);

  // Update stage height based on screen width
  useEffect(() => {
    const updateStageHeight = () => {
      if (window.innerWidth <= 689) {
        setStageHeight(400);
      } else {
        setStageHeight(450); // или другое значение по умолчанию
      }
      if (window.innerWidth <= 570) {
        setStageHeight(300);
      } else {
        setStageHeight(450); // или другое значение по умолчанию
      }
      if (window.innerWidth <= 439) {
        setStageHeight(260);
      } else {
        setStageHeight(450); // или другое значение по умолчанию
      }
    };

    updateStageHeight(); // Инициализация высоты при монтировании
    window.addEventListener("resize", updateStageHeight); // Обработка изменения размера окна

    return () => window.removeEventListener("resize", updateStageHeight);
  }, []);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDownload = () => {
    if (stageRef.current) {
      domtoimage
        .toPng(stageRef.current.container())
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "design.png";
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Error capturing image:", err);
        });
    } else {
      console.error("Stage reference is null");
    }
  };

  return (
    <>
      <Stage
        width={580}
        height={stageHeight}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setIsSelected(false);
          }
        }}
        onTouchStart={(e) => {
          if (e.target === e.target.getStage()) {
            setIsSelected(false);
          }
        }}
        ref={stageRef} // Применяем реф к Stage
      >
        <Layer>
          {bgImage && (
            <Image
              image={bgImage}
              x={0}
              y={0}
              width={580}
              height={stageHeight}
              draggable={false}
            />
          )}
          {image && (
            <Image
              image={image}
              x={50}
              y={50}
              draggable
              onClick={() => setIsSelected(true)}
              onTap={() => setIsSelected(true)}
              ref={imageRef}
              onTransformEnd={() => {
                const node = imageRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);

                node.width(node.width() * scaleX);
                node.height(node.height() * scaleY);
              }}
            />
          )}
          {isSelected && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 50 || newBox.height < 50) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
      {/* <button onClick={handleDownload}>Download Image</button>{" "} */}
      {/* <Download img/> */}
      {/* Кнопка для скачивания */}
    </>
  );
};

export default ResizableRotatableImage;
