package main

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/ngenohkevin/go-movies/handlers"
	"github.com/ngenohkevin/go-movies/models"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)
const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "dylstar20"
	dbname   = "go_movies"
)


func main() {

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)


	db, err := openDB()
	if err != nil {
		logger.Fatal(err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {

		}
	}(db)

	app := &handlers.Application{
		Log: logger,
		Model: models.NewModels(db),
	}
	//app := handlers.Application{
	//	logger: logger,
	//	models: models.NewModels(db),
	//}

	server := &http.Server {
		Addr: ":8000",
		Handler: app.Routes(),
		IdleTimeout: time.Minute,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 30 *time.Second,
	}
	logger.Println("Starting server")

	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

func openDB() (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		panic(err)
	}
	return db, nil
}

