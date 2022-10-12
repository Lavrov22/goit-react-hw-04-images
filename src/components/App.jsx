import { Component } from "react";
import { fetchImagesApi } from "api/Api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { Idle, Rejected, Empty } from "components/App.styled";
import 'react-toastify/dist/ReactToastify.css';



export class App extends Component {

  state = {
    newQuery: '',
    page: 1,
    items: [],
    status: 'idle',
    error: null,
    showModal: false,
    modalImg: null,
  }

  async componentDidUpdate(_, prevState) {
      if (prevState.newQuery !== this.state.newQuery || prevState.page !== this.state.page) {
       this.fetchImages();
       
    };
  };


  handleSearchbar = (query) => {
    if (this.state.newQuery !== query) {
      this.setState({ newQuery: query, page: 1, items: []});
    };
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  setImageUrl = (image) => {
    this.setState({
      modalImg: image,
    })
  }
      

  fetchImages = async () => {
    const { newQuery, page } = this.state;
    try {
      this.setState({ status: 'pending' });
      fetchImagesApi(newQuery, page).then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Ничего не найдено по запросу ${newQuery}`)
        );
      }).then(serchQuery => {
        if (serchQuery.totalHits === 0) {
          return this.setState({ status: 'empty' });
        };
        return serchQuery;
      })
        .then(items => this.setState({ items: [...this.state.items, ...items.hits], status: 'resolved' }))
    }
    catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  openModal = (image) => {
    this.setState(({ showModal, modalImg }) => ({
      modalImg: image,
      showModal: true,
    }));
  };

  closeModal = () => {
     this.setState(({ showModal }) => ({
      showModal: false,
    }));
  }

  render() {
    const { items, error, newQuery, status, modalImg, showModal} = this.state;
    return (
      <div>
        <ToastContainer position="top-center"
          autoClose={2000} />
        <Searchbar onSubmit={this.handleSearchbar} />
        {this.state.status === 'empty' && <Empty> Ничего не найдено по запросу {newQuery }!!!</Empty>}
        {status === 'idle' && <Idle> Введи в строку поиска!!!</Idle>}
        {status === 'pending' && <Loader/> }
        {status === 'rejected' && <Rejected>{error.message}</Rejected>}
        {items.length > 0 && <ImageGallery items={items} onOpenModal={this.openModal} />}
        {status === 'resolved' && <Button loadMore={this.loadMore}/>}
        {showModal && <Modal onClose={this.closeModal} modalImg={modalImg} />}
      </div>
  );
  };
  
};
