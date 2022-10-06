import { ImageItem, Image } from "components/ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({id, webformatURL, tags}) => {
    return (
        <ImageItem key={id}>
            <Image src={webformatURL} alt={tags} />
        </ImageItem>
    );
}