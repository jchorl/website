package index

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
}

var templates = template.Must(template.ParseGlob("dest/*.html"))

func indexHandler(w http.ResponseWriter, r *http.Request) {
	err := templates.ExecuteTemplate(w, "index", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
