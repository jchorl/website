package main

import (
	"log"
	"net/http"
	"os"

	location "github.com/jchorl/website/location"
)

func main() {
	http.HandleFunc("/api/location", location.GetHandler)
	http.HandleFunc("/api/location/new", location.PostHandler)
	http.HandleFunc("/api/location/update", location.PutHandler)
	http.HandleFunc("/api/location/delete", location.DeleteHandler)
	http.HandleFunc("/resume", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "#resume", http.StatusMovedPermanently)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
