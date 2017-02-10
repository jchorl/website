package server

import (
	_ "appengine"
	_ "appengine/datastore"
	"encoding/json"
	"net/http"
)

type Location struct {
	Name  string `json:"name"`
	Lat   float64 `json:"lat"`
	Lng  float64 `json:"lng"`
	Order int `json:"-"`
}

func init() {
	http.HandleFunc("/api/location", locationsGetHandler)
}

func getLocations(r *http.Request) ([]Location, error) {
	// c := appengine.NewContext(r)
	// query := datastore.NewQuery("Location").Order("Order")

	// locations := []Location{}
	// _, err := query.GetAll(c, &locations)
	// if err != nil {
	// 	return nil, err // }

	// return locations, nil
	return []Location{
		Location{
			"Toronto",
			43.762175,
			-79.423025,
			1,
		},
		Location{
			"Israel",
			31.127667,
			34.834623,
			2,
		},
	}, nil
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
