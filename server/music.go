package server

import (
	"appengine"
	"appengine/datastore"
	"encoding/json"
	"net/http"
)

type Song struct {
	Name   string
	Artist string
	Id     int
	Order  int
}

func init() {
	http.HandleFunc("/api/music/new", newSong)
}

func newSong(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	decoder := json.NewDecoder(r.Body)
	var song Song
	err := decoder.Decode(&song)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = datastore.Put(c, datastore.NewIncompleteKey(c, "Song", nil), &song)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func getSongs(r *http.Request) []Song {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Song").Order("Order")

	var songs []Song
	query.GetAll(c, &songs)
	return songs
}
