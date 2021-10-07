package handlers

import (
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"github.com/ngenohkevin/go-movies/models"
	"log"
	"net/http"
	"strconv"
	"time"
)

type jsonResp struct {
	OK bool	`json:"ok"`
	Message string `json:"message"`
}

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

type MoviePayload struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year string `json:"year"`
	ReleaseDate string `json:"release_date"`
	Runtime string `json:"runtime"`
	Rating string `json:"rating"`
	MPAARating string `json:"mpaa_rating"`
}

func (app *Application) editMovie(w http.ResponseWriter, r *http.Request) {
	var payload MoviePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err)
		return
	}
	var movie models.Movie

	if payload.ID != "0"{
		id, _ := strconv.Atoi(payload.ID)
		m, _:= app.Model.DB.Get(id)
		movie = *m
		movie.UpdatedAt = time.Now()
	}

	movie.ID, _ = strconv.Atoi(payload.ID)
	movie.Title = payload.Title
	movie.Description = payload.Description
	movie.ReleaseDate,_ = time.Parse("2006-01-02",payload.ReleaseDate)
	movie.Year = movie.ReleaseDate.Year()
	movie.Runtime, _ = strconv.Atoi(payload.Runtime)
	movie.Rating, _ = strconv.Atoi(payload.Rating)
	movie.MPAARating = payload.MPAARating
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = time.Now()

	if movie.ID == 0 {
		err = app.Model.DB.InsertMovie(movie)
		if err != nil {
			app.errorJSON(w, err)
			return
		}
	} else {
		err = app.Model.DB.UpdateMovie(movie)
		if err != nil {
			app.errorJSON(w, err)
			return
		}
	}

	ok := jsonResp{
		OK: true,
	}
	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}

}
func (app *Application) searchMovie(w http.ResponseWriter, r *http.Request) {

}