import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImagesList} from "components/ImageGallery/ImageGallery.styled";


export const ImageGallery = ({ items, onOpenModal }) => {
    console.log(items.length > 0)
    return (
        <ImagesList>
            {items.map(item => <ImageGalleryItem key={item.id} item={item} onOpenModal={onOpenModal} />)}
        </ImagesList>
    );
};

ImageGallery.propTypes = {
    onOpenModal: PropTypes.func.isRequired,  
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })),   
}