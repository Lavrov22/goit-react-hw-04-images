import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImagesList} from "components/ImageGallery/ImageGallery.styled";


export const ImageGallery = ({ items }) => {
    return (
        <ImagesList>
            {items.map(({ id, webformatURL, tags }) =>
                <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />)}
        </ImagesList>
    );
};
