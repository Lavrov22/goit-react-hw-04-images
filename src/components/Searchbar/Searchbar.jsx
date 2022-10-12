import PropTypes from 'prop-types';
import { Component } from "react";
import { ImSearch } from "react-icons/im";
import {toast } from "react-toastify";
import {SearchbarHeader, SearchbarForm, SearchbarButton,SearchbarButtonLabel, SearchbarInput  } from "components/Searchbar/Searchbar.styled";

export class Searchbar extends Component{

    state = {
        query: '',
    }

    hendleChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        const { query } = this.state;
        e.preventDefault();
        if (query.trim() === '') {
           return toast.warning('Введите что нибудь');
        }
        this.props.onSubmit(query);
        // this.reset();
    }

    // reset = () => {
    //     this.setState({ query: '', });
    // }

    render() {
        const { query } = this.state;
        return (
            <SearchbarHeader>
                <SearchbarForm onSubmit={this.handleSubmit}>
                    <SearchbarButton type="submit">
                        <ImSearch size={24} />
                    <SearchbarButtonLabel>Search</SearchbarButtonLabel>
                    </SearchbarButton>

                    <SearchbarInput
                        name="query"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.hendleChange}
                        value={query}
                    />
                </SearchbarForm>
            </SearchbarHeader>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}