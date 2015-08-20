package server

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/admin", adminHandler)
}

func handleErr(err error, w http.ResponseWriter) {
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}
}

var publicTemplates = template.Must(template.ParseFiles("dest/index.html"))
var adminTemplates = template.Must(template.ParseFiles("dest/admin.html"))

func indexHandler(w http.ResponseWriter, r *http.Request) {
	_, songs := getSongs(w, r)
	data := struct {
		FirstSongLink string
		OtherSongs    []Song
	}{}
	if len(songs) > 0 {
		data.FirstSongLink = songs[0].Link
		if len(songs) > 1 {
			data.OtherSongs = songs[1:]
		}
	}
	err := publicTemplates.ExecuteTemplate(w, "index", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
	locationKeys, locations := getLocations(w, r)
	songKeys, songs := getSongs(w, r)
	data := struct {
		Songs        []Song
		SongKeys     []int64
		Locations    []Location
		LocationKeys []int64
	}{
		songs,
		songKeys,
		locations,
		locationKeys,
	}
	err := adminTemplates.ExecuteTemplate(w, "admin", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
