package server

import (
	"encoding/json"
	"net/http"

	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

const datastoreType = "Location"

// Location represents a location on a map
type Location struct {
	Name  string  `json:"name"`
	Lat   float64 `json:"lat"`
	Lng   float64 `json:"lng"`
	Key   string  `json:"key",datastore:"-"`
	Order int     `json:"order"`
}

func init() {
	http.HandleFunc("/api/location", locationsGetHandler)
	http.HandleFunc("/api/location/new", locationsPostHandler)
	http.HandleFunc("/api/location/update", locationsPutHandler)
	http.HandleFunc("/api/location/delete", locationsDeleteHandler)
}

func addLocation(c context.Context, loc Location) (Location, error) {
	key, err := datastore.Put(c, datastore.NewIncompleteKey(c, datastoreType, nil), &loc)
	if err != nil {
		return loc, err
	}
	loc.Key = key.Encode()
	return loc, nil
}

func updateLocation(c context.Context, loc Location) (Location, error) {
	key, err := datastore.DecodeKey(loc.Key)
	if err != nil {
		return loc, err
	}

	key, err = datastore.Put(c, key, &loc)
	if err != nil {
		return loc, err
	}

	loc.Key = key.Encode()
	return loc, nil
}

func getLocations(c context.Context) ([]Location, error) {
	query := datastore.NewQuery(datastoreType).Order("Order")

	locations := []Location{}
	keys, err := query.GetAll(c, &locations)
	if err != nil {
		return nil, err
	}

	for i, key := range keys {
		locations[i].Key = key.Encode()
	}

	return locations, nil
}

func deleteLocation(c context.Context, loc Location) error {
	key, err := datastore.DecodeKey(loc.Key)
	if err != nil {
		return err
	}

	return datastore.Delete(c, key)
}

func locationsGetHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	locations, err := getLocations(c)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(locations)
}

func locationsPostHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	location, err = addLocation(c, location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	encoder := json.NewEncoder(w)
	encoder.Encode(location)
}

func locationsPutHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	location, err = updateLocation(c, location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	encoder := json.NewEncoder(w)
	encoder.Encode(location)
}

func locationsDeleteHandler(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = deleteLocation(c, location); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
