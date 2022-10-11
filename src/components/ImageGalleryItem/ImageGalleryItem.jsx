import PropTypes from 'prop-types';
import { ImageItem, Image } from "components/ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({ item: { largeImageURL, webformatURL, tags }, onOpenModal }) => {
    const largeImg = () => onOpenModal(largeImageURL);
    return (
        <ImageItem>
            <Image src={webformatURL} alt={tags} onClick={largeImg}/>
        </ImageItem>
    );
};

ImageGalleryItem.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    item: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    })
    
}