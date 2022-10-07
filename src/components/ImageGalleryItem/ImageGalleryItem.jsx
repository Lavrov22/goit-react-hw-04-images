import { ImageItem, Image } from "components/ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({webformatURL, tags}) => {
    return (
        <ImageItem>
            <Image src={webformatURL} alt={tags} />
        </ImageItem>
    );
}