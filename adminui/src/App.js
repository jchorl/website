import React, { Component, PropTypes } from 'react';
import './App.css';

function emptyPlace() {
    return {
        name: '',
        lat: 0,
        lng: 0,
        order: 0
    };
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
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

    updatePlaces = place => {
        let places = this.state.places.slice(0);
        for (let i = 0; i < places.length; ++i) {
            if (places[i].key === place.key) {
                places[i] = place;
                this.setState({ places });
                return;
            }
        }

        places.push(place);
        this.setState({ places });
    }

    deletePlace = key => {
        let places = this.state.places.slice(0);
        let index = places.findIndex(place => place.key === key);
        if (index > -1) {
            places.splice(index, -1);
        }
        this.setState({ places });
    }

    render() {
        let { places } = this.state;
        return (
                <div>
                    <h1>Places</h1>
                    { places.map(place => <PlaceForm key={ place.key } place={ place } updatePlaces={ this.updatePlaces } deletePlace={ this.deletePlace } />) }
                    <PlaceForm updatePlaces={ this.updatePlaces } deletePlace={ this.deletePlace } />
                </div>
                );
    }
}

class PlaceForm extends Component {
    static propTypes = {
        deletePlace: PropTypes.func.isRequired,
        place: PropTypes.object,
        updatePlaces: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        let place = props.place
            ? props.place
            : emptyPlace();
        this.state = { place };
    }

    handleChange = field => event => {
        let place = Object.assign({}, this.state.place);
        let val = event.target.value;
        if (field === 'lat' || field === 'lng') {
            val = parseFloat(val);
        } else if (field === 'order') {
            val = parseInt(val, 10);
        }
        place[field] = val;
        this.setState({ place });
    }

    handleSubmit = event => {
        let isUpdate = !!this.state.place.key;
        let url = isUpdate
            ? '/api/location/update'
            : '/api/location/new';
        fetch(url, {
            headers: new Headers({ accept: 'application/json' }),
            method: 'POST',
            body: JSON.stringify(this.state.place)
        })
        .then(resp => resp.json())
            .then(updatedPlace => {
                let {
                    place,
                    updatePlaces
                } = this.props;

                updatePlaces(updatedPlace);
                if (!place) {
                    this.setState({ place: emptyPlace() });
                }
            });
        event.preventDefault();
    }

    deletePlace = event => {
        fetch('/api/location/delete', {
            headers: new Headers({ accept: 'application/json' }),
            method: 'POST',
            body: JSON.stringify(this.state.place)
        })
        .then(resp => resp.json())
            .then(updatedPlace => {
                let {
                    deletePlace
                } = this.props;

                deletePlace(this.state.place.key);
            });
    }

    render() {
        return (
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Name:
                        <input type="text" value={ this.state.place.name } onChange={ this.handleChange("name") } />
                    </label>
                    <label>
                        Lat:
                        <input type="number" step="any" value={ this.state.place.lat } onChange={ this.handleChange("lat") } />
                    </label>
                    <label>
                        Lng:
                        <input type="number" step="any" value={ this.state.place.lng } onChange={ this.handleChange("lng") } />
                    </label>
                    <label>
                        Order:
                        <input type="number" value={ this.state.place.order } onChange={ this.handleChange("order") } />
                    </label>
                    <button onClick={ this.deletePlace }>Delete</button>
                    <input type="submit" value="Submit" />
                </form>
                );
    }
}
