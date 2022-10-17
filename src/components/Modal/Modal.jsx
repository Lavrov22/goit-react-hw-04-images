import PropTypes from 'prop-types';
import { Overlay, ModalStyle } from "components/Modal/Modal.styled";
import  {createPortal} from 'react-dom';
// import { Component } from "react";
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');
// ===============class===============
// export class Modal extends Component {

//    componentDidMount() {

//        window.addEventListener('keydown',  this.handleEscape);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown',  this.handleEscape);
//     }
//     handleEscape = (e) => {
//         if (e.code === 'Escape') {
//             this.props.onClose();
//         };
//     };

//     handleOverlayClick = (e) => {
//         if (e.target === e.currentTarget) {
//             this.props.onClose();
//         }
//     }



//     render() {

//         return createPortal(
//             <Overlay onClick={this.handleOverlayClick}>
//                 <ModalStyle>
//                     <img src={this.props.modalImg} alt="Open modal" />
//                 </ModalStyle>
//             </Overlay>, modalRoot,
//         );
//    }
// }
// =================hooks==================

export const Modal = ({modalImg, onClose}) => {


    useEffect(() => {
        const handleEscape = (e) => {
            if (e.code === 'Escape') {
                onClose();
            };
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        };
    };

        return createPortal(
            <Overlay onClick={handleOverlayClick}>
                <ModalStyle>
                    <img src={modalImg} alt="Open modal" />
                </ModalStyle>
            </Overlay>, modalRoot,
        );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,

}