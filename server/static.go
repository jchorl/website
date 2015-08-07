package static

import (
	"fmt"
	"net/http"
)

func init() {
	http.HandleFunc("/", staticHandler)
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, world!")
}
