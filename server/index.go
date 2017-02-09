package server

import (
	"net/http"
)

func init() {
	http.HandleFunc("/resume", resumeHandler)
}

func resumeHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "#resume", http.StatusMovedPermanently)
}
