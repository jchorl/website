package server

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

type Song struct {
	Title  string
	Artist string
	Link   string
	Order  int
}

func init() {
	http.HandleFunc("/api/songs", songsGetHandler)
}

func getSongs(r *http.Request) ([]Song, error) {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Song").Order("Order")

	var songs []Song
	_, err := query.GetAll(c, &songs)
	if err != nil {
		return nil, err
	}

	return songs, nil
}

func songsGetHandler(w http.ResponseWriter, r *http.Request) {
	songs, err := getSongs(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	encoder := json.NewEncoder(w)
	encoder.Encode(songs)
}
