package handlers

import (
	"encoding/json"
	"net/http"
)
type Movie struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`

}

func StatusHandler(w http.ResponseWriter, r *http.Request) {
	movies := []Movie {
		{3021, "SpiderMan", "Movie about superheroes"},
		{2123,"wonderWoman", "some woman running with a leash"},
	}
	w.Header().Add("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(movies)
	if err != nil {
		return
	}
}