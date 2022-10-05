import { Component } from "react";
import { ImSearch } from "react-icons/im";
import {SearchbarHeader, SearchbarForm, SearchbarButton,SearchbarButtonLabel, SearchbarInput  } from "components/Searchbar/Searchbar.styled";

export class Searchbar extends Component{

    state = {
        name:'',
    }

    hendleChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        console.log(e.target)
    }

    render() {
        return (
            <SearchbarHeader>
                <SearchbarForm onSubmit={this.handleSubmit}>
                    <SearchbarButton type="submit">
                        <ImSearch size={24} />
                    <SearchbarButtonLabel>Search</SearchbarButtonLabel>
                    </SearchbarButton>

                    <SearchbarInput
                        name="name"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.hendleChange}
                    />
                </SearchbarForm>
            </SearchbarHeader>
        );
    }
}