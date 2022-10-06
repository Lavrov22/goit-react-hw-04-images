import { Component } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImagesList} from "components/ImageGallery/ImageGallery.styled";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=29607752-b3abb9abc1baaf34c2e91fe2c';
const OPTIONS = 'image_type=photo&orientation=horizontal&per_page=12'

export class ImageGallery extends Component {
    state = {
        serchQuery: [],
    }
    componentDidUpdate(prevProps, _) {
        if (prevProps.query !== this.props.query) {
          fetch(`${BASE_URL}${API_KEY}&q=${this.props.query}&${OPTIONS}`).then(res => res.json()).then(serchQuery => this.setState({ serchQuery: serchQuery.hits }));
        }
    };
    
    render() {
        console.log(this.state.serchQuery)
        return (
            <>
                <ImagesList>
                    {this.state.serchQuery.map(({id, webformatURL, tags}) =>
                    <ImageGalleryItem id={id} webformatURL={webformatURL} tags={tags } />)}
                </ImagesList>
            </>
        );
    };
}