import { Component } from "react";
import { fetchImagesApi } from "api/Api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Idle, Pending, Rejected, Empty } from "components/ImageGallery/ImageGallery.styled";
import { ImSpinner3 } from "react-icons/im";

export class App extends Component {

  state = {
    newQuery: '',
    page: 1,
    items: [],
    status: 'idle',
    error: null,
  }

  componentDidUpdate(_, prevState) {
    if (prevState.newQuery !== this.state.newQuery || prevState.page !== this.state.page) {
      console.log("fetch data")
      this.fetchImages();
    };
  };

  handleSearchbar = (query) => {
    this.setState({ newQuery: query, page: 1, items: []});
  };

  loadMore = () => {
    console.log(this.state.items)
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  fetchImages = () => {
    try {
      this.setState({ status: 'pending' });
      fetchImagesApi(this.state.newQuery, this.state.page).then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Ничего не найдено по запросу ${this.state.newQuery}`)
        );
      }).then(serchQuery => {
        if (serchQuery.totalHits === 0) {
          return this.setState({ status: 'empty' });
        };
        return serchQuery;
      }).then(items => this.setState({ items: [...this.state.items, ...items.hits], status: 'resolved' }))
    }
    catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer position="top-center"
          autoClose={2000} />
        <Searchbar onSubmit={this.handleSearchbar} />
        {this.state.status === 'empty' && <Empty> Ничего не найдено по запросу {this.state.newQuery }!!!</Empty>}
        {this.state.status === 'idle' && <Idle> Введи в строку поиска!!!</Idle>}
        {this.state.status === 'pending' && <Pending>Загружаем<ImSpinner3 /></Pending>}
        {this.state.status === 'rejected' && <Rejected>{this.state.error.message}</Rejected>}
        {this.state.status === 'resolved' && <ImageGallery items={this.state.items} />}
        {this.state.status === 'resolved' && <Button loadMore={this.loadMore} />}
      </div>
  );
  };
  
};
