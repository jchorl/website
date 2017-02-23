import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            newPlace: {
                name: '',
            },
            places: []
        };
    }

    componentDidMount() {
        fetch('/api/location', { headers: new Headers({ accept: 'application/json' }) })
            .then(resp => resp.json())
            .then(places => {
                this.setState({ places });
            });
    }

    handleChange = field => event => {
        let newPlace = Object.assign(this.state.newPlace);
        newPlace[field] = event.target.value;
        this.setState({ newPlace });
    }

    handleSubmit = event => {
        console.log(this.state.newPlace);
        event.preventDefault();
    }

    render() {
        return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={ this.state.newPlace.name } onChange={ this.handleChange("name") } />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
    }
}

export default App;
