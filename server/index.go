package server

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
}

var templates = template.Must(template.ParseGlob("dest/*.html"))

func indexHandler(w http.ResponseWriter, r *http.Request) {
	songs := getSongs(r)
	data := struct {
		FirstSongLink string
		OtherSongs    []Song
	}{
		songs[0].Link,
		songs[1:],
	}
	err := templates.ExecuteTemplate(w, "index", data)
	if err != nil {
		log.Printf("%s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
