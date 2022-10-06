import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {

  state = {
    query: '',
  }

  handleSearchbar = (query) => {
    console.log(query)
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <ToastContainer position="top-center"
          autoClose={2000} />
        <Searchbar onSubmit={this.handleSearchbar} />
        <ImageGallery query={this.state.query} />
      </div>
  );
  };
  
};
