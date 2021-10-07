package handlers

import (

	"github.com/gorilla/mux"
	"github.com/ngenohkevin/go-movies/models"
	"log"
	"net/http"
)
type Application struct {
	Log  *log.Logger
	Model models.Models
}

func (app Application) Routes() http.Handler{


	router := mux.NewRouter()


	router.HandleFunc("/status", StatusHandler).Methods("GET")
	router.HandleFunc("/v1/movie/{id:[0-9]+}",app.getOneMovie).Methods("GET")
	router.HandleFunc("/v1/movies",app.getAllMovie).Methods("GET")
	router.HandleFunc("/v1/movies/{genre_id}",app.getAllMoviesByGenre).Methods("GET")

	router.HandleFunc("/v1/genres",app.getAllGenres).Methods("GET")
	router.HandleFunc("/v1/admin/editmovie",app.editMovie).Methods("POST")

	return app.enableCORS(router)
}

