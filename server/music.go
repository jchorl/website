package server

import (
	"appengine"
	"appengine/datastore"
	"net/http"
	"strconv"
)

type Song struct {
	Title  string
	Artist string
	Link   string
	Order  int
}

func init() {
	http.HandleFunc("/api/music/new", handleNewSong)
	http.HandleFunc("/api/music/update", handleUpdateSong)
}

func parseSongForm(w http.ResponseWriter, r *http.Request) Song {
	order, err := strconv.Atoi(r.FormValue("Order"))
	handleErr(err, w)
	return Song{r.FormValue("Title"), r.FormValue("Artist"), r.FormValue("Link"), order}
}

func handleNewSong(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	song := parseSongForm(w, r)

	_, err := datastore.Put(c, datastore.NewIncompleteKey(c, "Song", nil), &song)
	handleErr(err, w)
}

func handleUpdateSong(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	keyInt, err := strconv.ParseInt(r.FormValue("Key"), 10, 64)
	key := datastore.NewKey(c, "Song", "", keyInt, nil)
	handleErr(err, w)
	if r.FormValue("Action") == "Delete" {
		err = datastore.Delete(c, key)
	} else if r.FormValue("Action") == "Update" {
		song := parseSongForm(w, r)
		_, err = datastore.Put(c, key, &song)
	}
	handleErr(err, w)
}

func getSongs(w http.ResponseWriter, r *http.Request) ([]int64, []Song) {
	c := appengine.NewContext(r)
	query := datastore.NewQuery("Song").Order("-Order")

	var songs []Song
	keys, err := query.GetAll(c, &songs)
	handleErr(err, w)

	intKeys := make([]int64, len(keys))
	for index, elem := range keys {
		intKeys[index] = elem.IntID()
	}
	return intKeys, songs
}
