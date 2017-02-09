package server

import (
	"appengine"
	"appengine/datastore"
	"encoding/json"
	"net/http"
)

type Location struct {
	Name  string `json:"name"`
	Lat   float64 `json:"lat"`
	Long  float64 `json:"long"`
	Order int `json:"-"`
}

func init() {
	http.HandleFunc("/api/location", locationsGetHandler)
}

func getLocations(r *http.Request) ([]Location, error) {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Location").Order("Order")

	locations := []Location{}
	_, err := query.GetAll(c, &locations)
	if err != nil {
		return nil, err
	}

	return locations, nil
}

func locationsGetHandler(w http.ResponseWriter, r *http.Request) {
	locations, err := getLocations(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.Encode(locations)
}
