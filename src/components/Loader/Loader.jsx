import { Pending } from "components/Loader/Loader.styled";
import { ImSpinner3 } from "react-icons/im";

export const Loader = () => {
    return (
        <Pending>Загружаем<ImSpinner3 /></Pending>
    );

}