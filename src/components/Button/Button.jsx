import { ButtonLoadMore } from "components/Button/Button.styled";

export const Button = ({ loadMore }) => {

        return (
        <ButtonLoadMore type="button" onClick={loadMore}>Load More</ButtonLoadMore>
    );

}