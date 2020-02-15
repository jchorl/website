package server

import (
	"encoding/json"
	"net/http"

	"cloud.google.com/go/datastore"
	"golang.org/x/net/context"

	"github.com/jchorl/website/db"
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

func addLocation(c context.Context, loc Location) (Location, error) {
	dbClient := db.NewClient(c)
	key, err := dbClient.Put(c, datastore.IncompleteKey(datastoreType, nil), &loc)
	if err != nil {
		return loc, err
	}
	loc.Key = key.Encode()
	return loc, nil
}

func updateLocation(c context.Context, loc Location) (Location, error) {
	dbClient := db.NewClient(c)
	key, err := datastore.DecodeKey(loc.Key)
	if err != nil {
		return loc, err
	}

	key, err = dbClient.Put(c, key, &loc)
	if err != nil {
		return loc, err
	}

	loc.Key = key.Encode()
	return loc, nil
}

func getLocations(c context.Context) ([]Location, error) {
	dbClient := db.NewClient(c)
	query := datastore.NewQuery(datastoreType).Order("Order")

	locations := []Location{}
	keys, err := dbClient.GetAll(c, query, &locations)
	if err != nil {
		return nil, err
	}

	for i, key := range keys {
		locations[i].Key = key.Encode()
	}

	return locations, nil
}

func deleteLocation(c context.Context, loc Location) error {
	dbClient := db.NewClient(c)
	key, err := datastore.DecodeKey(loc.Key)
	if err != nil {
		return err
	}

	return dbClient.Delete(c, key)
}

func GetHandler(w http.ResponseWriter, r *http.Request) {
	locations, err := getLocations(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(locations)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	location, err = addLocation(r.Context(), location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	encoder := json.NewEncoder(w)
	encoder.Encode(location)
}

func PutHandler(w http.ResponseWriter, r *http.Request) {
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	location, err = updateLocation(r.Context(), location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	encoder := json.NewEncoder(w)
	encoder.Encode(location)
}

func DeleteHandler(w http.ResponseWriter, r *http.Request) {
	var location Location
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = deleteLocation(r.Context(), location); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
