import { useState, useEffect } from "react";
import { fetchImagesApi } from "api/Api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { Idle, Rejected } from "components/App.styled";
import 'react-toastify/dist/ReactToastify.css';

// ===========class==================

// export class App extends Component {

//   state = {
//     newQuery: '',
//     page: 1,
//     items: [],
//     status: 'idle',
//     error: null,
//     showModal: false,
//     modalImg: null,
//   }

//   componentDidUpdate(_, prevState) {
//       if (prevState.newQuery !== this.state.newQuery || prevState.page !== this.state.page) {
//        this.fetchImages();
       
//     };
//   };


//   handleSearchbar = (query) => {
//     if (this.state.newQuery !== query) {
//       this.setState({ newQuery: query, page: 1, items: []});
//     };
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   setImageUrl = (image) => {
//     this.setState({
//       modalImg: image,
//     })
//   }
      

//   fetchImages = () => {
//     const { newQuery, page } = this.state;
//     try {
//       this.setState({ status: 'pending' });
//       fetchImagesApi(newQuery, page).then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(
//           new Error(`Ничего не найдено по запросу ${newQuery}`)
//         );
//       }).then(serchQuery => {
//         if (serchQuery.totalHits === 0) {
//           return this.setState({ status: 'empty' });
//         };
//         return serchQuery;
//       })
//         .then(items => this.setState({ items: [...this.state.items, ...items.hits], status: 'resolved' }))
//     }
//     catch (error) {
//       this.setState({ error, status: 'rejected' });
//     }
//   };

//   openModal = (image) => {
//     this.setState(({ showModal, modalImg }) => ({
//       modalImg: image,
//       showModal: true,
//     }));
//   };

//   closeModal = () => {
//      this.setState(({ showModal }) => ({
//       showModal: false,
//     }));
//   }

//   render() {
//     const { items, error, newQuery, status, modalImg, showModal} = this.state;
//     return (
//       <div>
//         <ToastContainer position="top-center"
//           autoClose={2000} />
//         <Searchbar onSubmit={this.handleSearchbar} />
//         {this.state.status === 'empty' && <Empty> Ничего не найдено по запросу {newQuery }!!!</Empty>}
//         {status === 'idle' && <Idle> Введи в строку поиска!!!</Idle>}
//         {status === 'pending' && <Loader/> }
//         {status === 'rejected' && <Rejected>{error.message}</Rejected>}
//         {items.length > 0 && <ImageGallery items={items} onOpenModal={this.openModal} />}
//         {status === 'resolved' && <Button loadMore={this.loadMore}/>}
//         {showModal && <Modal onClose={this.closeModal} modalImg={modalImg} />}
//       </div>
//   );
//   };
  
// };

// =================hooks=====================

export const App = () => {
  const [newQuery, setNewQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);


  useEffect(() => {
    if (!newQuery) {
      return;
    };
      const fetchImages = () => {

        setStatus('pending');
        fetchImagesApi(newQuery, page).then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Ничего не найдено по запросу ${newQuery}`)
          );
        })
          .then(serchQuery => {
          if (serchQuery.totalHits === 0) {
           return Promise.reject(
            new Error(`Ничего не найдено по запросу ${newQuery}`)
          );
          };
          return serchQuery;
        })
          .then(items =>
        {
          setItems(prevState => [...prevState, ...items.hits]);
          setStatus('resolved');
        }).catch(error => {
            setError(error);
            setStatus('rejected');
          });
    };
    fetchImages();
    
  }, [newQuery, page]);

  const handleSearchbar = (query) => {
    if (newQuery !== query) {
      setNewQuery(query);
      setPage(1);
      setItems([]);
    };
  };


  
  const loadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };
      
  const openModal = (image) => {
    setShowModal(true);
    setModalImg(image);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      <ToastContainer position="top-center"
        autoClose={2000} />
      <Searchbar onSubmit={handleSearchbar} />
      {status === 'idle' && <Idle> Введи в строку поиска!!!</Idle>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <Rejected>{error.message}</Rejected>}
      {items.length > 0 && <ImageGallery items={items} onOpenModal={openModal} />}
      {status === 'resolved' && <Button loadMore={loadMore} />}
      {showModal && <Modal onClose={closeModal} modalImg={modalImg} />}
    </div>
  );
};
  

