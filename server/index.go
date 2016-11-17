package server

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/resume", resumeHandler)
	http.HandleFunc("/resume.", resumeHandler)
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
	err := publicTemplates.ExecuteTemplate(w, "index", songs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func resumeHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "#resume", http.StatusMovedPermanently)
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
