package server

import (
	"appengine"
	"appengine/datastore"
	"encoding/json"
	"net/http"
)

type Location struct {
	Name  string
	Lat   float32
	Long  float32
	Order int
}

func init() {
	http.HandleFunc("/api/location", getLocations)
	http.HandleFunc("/api/location/new", newLocation)
}

func newLocation(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	decoder := json.NewDecoder(r.Body)
	var loc Location
	err := decoder.Decode(&loc)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = datastore.Put(c, datastore.NewIncompleteKey(c, "Location", nil), &loc)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func getLocations(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Location").Order("Order")

	var locations []Location
	_, err := query.GetAll(c, &locations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.Encode(locations)
}
