package handlers

import (
	"errors"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func (app *Application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		app.Log.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	movie, err := app.Model.DB.Get(id)

	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *Application) getAllMovie(w http.ResponseWriter, r *http.Request) {
	movies, err := app.Model.DB.All()
	if err != nil{
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
func (app *Application) getAllGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := app.Model.DB.GenresAll()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, genres, "genres")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
func (app *Application) getAllMoviesByGenre(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	genreID, err := strconv.Atoi(params["genre_id"])
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	movies, err := app.Model.DB.All(genreID)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *Application) deleteMovie(w http.ResponseWriter, r *http.Request) {

}
func (app *Application) insertMovie(w http.ResponseWriter, r *http.Request) {

}
func (app *Application) updateMovie(w http.ResponseWriter, r *http.Request) {

}
func (app *Application) searchMovie(w http.ResponseWriter, r *http.Request) {

}