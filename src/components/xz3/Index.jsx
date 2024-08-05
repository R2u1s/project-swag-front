import { saveAs } from "file-saver";

const Download = ({ img }) => {
  const downloadImage = () => {
    saveAs(img, "image.jpg"); // Put your image url here.
  };
  7;

  return <button onClick={downloadImage}>Download!</button>;
};

export default Download;
