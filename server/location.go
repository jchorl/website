package server

import (
	"appengine"
	"appengine/datastore"
	"encoding/json"
	"net/http"
	"strconv"
)

type Location struct {
	Name  string
	Lat   float64
	Long  float64
	Order int
}

func init() {
	http.HandleFunc("/api/location", handleGetLocations)
	http.HandleFunc("/api/location/new", handleNewLocation)
	http.HandleFunc("/api/location/update", handleUpdateLocation)
}

func parseLocationForm(w http.ResponseWriter, r *http.Request) Location {
	lat, err := strconv.ParseFloat(r.FormValue("Lat"), 64)
	handleErr(err, w)
	long, err := strconv.ParseFloat(r.FormValue("Long"), 64)
	handleErr(err, w)
	order, err := strconv.Atoi(r.FormValue("Order"))
	handleErr(err, w)
	return Location{r.FormValue("Name"), lat, long, order}
}

func handleNewLocation(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	loc := parseLocationForm(w, r)

	_, err := datastore.Put(c, datastore.NewIncompleteKey(c, "Location", nil), &loc)
	handleErr(err, w)
}

func handleUpdateLocation(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	loc := parseLocationForm(w, r)
	key, err := strconv.ParseInt(r.FormValue("Key"), 10, 64)
	handleErr(err, w)

	_, err = datastore.Put(c, datastore.NewKey(c, "Location", "", key, nil), &loc)
	handleErr(err, w)
}

func getLocations(w http.ResponseWriter, r *http.Request) ([]int64, []Location) {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Location").Order("Order")

	var locations []Location
	keys, err := query.GetAll(c, &locations)
	handleErr(err, w)

	intKeys := make([]int64, len(keys))
	for index, elem := range keys {
		intKeys[index] = elem.IntID()
	}
	return intKeys, locations
}

func handleGetLocations(w http.ResponseWriter, r *http.Request) {
	_, locations := getLocations(w, r)
	encoder := json.NewEncoder(w)
	encoder.Encode(locations)
}
