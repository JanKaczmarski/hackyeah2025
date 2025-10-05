package main

import (
	"datagen/internal/gen"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func schedule(w http.ResponseWriter, req *http.Request) {
	seed, err := strconv.ParseInt(req.Header.Get("X-Seed"), 10, 64)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		return
	}
	gen := gen.NewGenerator(seed)
	json, err := json.Marshal(gen.Schedule())
	fmt.Fprintf(w, string(json))
}

func user(w http.ResponseWriter, req *http.Request) {
	seed, err := strconv.ParseInt(req.Header.Get("X-Seed"), 10, 64)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		return
	}
	gen := gen.NewGenerator(seed)
	json, err := json.Marshal(gen.Users())
	fmt.Fprintf(w, string(json))
}

func disruption(w http.ResponseWriter, req *http.Request) {
	seed, err := strconv.ParseInt(req.Header.Get("X-Seed"), 10, 64)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		return
	}
	gen := gen.NewGenerator(seed)
	json, err := json.Marshal(gen.Disruptions())
	fmt.Fprintf(w, string(json))
}

func main() {
	// seed does not influence this
	http.HandleFunc("/schedule", schedule)
	// seed does influence this
	http.HandleFunc("/user", user)
	http.HandleFunc("/disruption", disruption)

	fmt.Print(http.ListenAndServe(":2137", nil))
}
