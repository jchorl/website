package server

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/admin", adminHandler)
}

// TODO: get proper template files
var publicTemplates = template.Must(template.ParseGlob("dest/*.html"))
var adminTemplates = template.Must(template.ParseGlob("dest/*.html"))

func indexHandler(w http.ResponseWriter, r *http.Request) {
	songs := getSongs(r)
	data := struct {
		FirstSongLink string
		OtherSongs    []Song
	}{
		songs[0].Link,
		songs[1:],
	}
	err := publicTemplates.ExecuteTemplate(w, "index", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
	err := adminTemplates.ExecuteTemplate(w, "admin", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
