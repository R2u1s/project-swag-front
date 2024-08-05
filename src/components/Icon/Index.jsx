import sprite from "./Sprite.svg";

const Icon = ({ id, className }) => (
  <svg className={className}>
    <use href={sprite + id}></use>
  </svg>
);

export default Icon;