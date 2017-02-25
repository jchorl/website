import React, { Component } from 'react';
import './App.css';

function emptyPlace() {
    return {
        name: '',
        lat: 0,
        lng: 0,
        order: 0
    };
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            newPlace: emptyPlace(),
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
        let val = event.target.value;
        if (field === 'lat' || field === 'lng') {
            val = parseFloat(val);
        } else if (field === 'order') {
            val = parseInt(val);
        }
        newPlace[field] = val;
        this.setState({ newPlace });
    }

    handleSubmit = event => {
        fetch('/api/location/new', {
            headers: new Headers({ accept: 'application/json' }),
            method: 'POST',
            body: JSON.stringify(this.state.newPlace)
        })
            .then(resp => resp.json())
            .then(newPlace => {
                let places = this.state.places.slice(0);
                places.push(newPlace);
                this.setState({
                    newPlace: emptyPlace(),
                    places
                });
            });
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
                        <label>
                            Lat:
                            <input type="number" step="any" value={ this.state.newPlace.lat } onChange={ this.handleChange("lat") } />
                        </label>
                        <label>
                            Lng:
                            <input type="number" step="any" value={ this.state.newPlace.lng } onChange={ this.handleChange("lng") } />
                        </label>
                        <label>
                            Order:
                            <input type="number" value={ this.state.newPlace.order } onChange={ this.handleChange("order") } />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
    }
}

export default App;
