import { Item, Img } from "./CSSItem";

const ImageGalleryItem = ({ id, onToggle, url, alt, onlargeImg }) => {
  return (
    <Item
      key={id}
      className="gallery-item"
      onClick={() => onToggle(onlargeImg, alt)}
    >
      <Img src={url} alt={alt} />
    </Item>
  );
};

export default ImageGalleryItem;
