import PropTypes from 'prop-types';
import { ButtonLoadMore } from "components/Button/Button.styled";

export const Button = ({ loadMore, items }) => {
    const totalHits = items.length;
    return (
        <>
            {totalHits < 500 && <ButtonLoadMore type="button" onClick={loadMore}>Load More</ButtonLoadMore>}
        </>
        );
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
}

