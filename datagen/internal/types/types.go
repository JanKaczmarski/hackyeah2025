package types

import "time"

type Rating struct {
	Upvotes   int
	Downvotes int
}

type Location struct {
	Latitude  float32
	Longitude float32
}

type User struct {
	Username       string
	HashedPassword string
	Rating         Rating
}

var DisruptionTypes = []string{
	"Accident",
	"Traffic Jam",
	"Road Closure",
	"Construction",
	"Weather Condition",
	"Object on Road",
}

type Disruption struct {
	Type     string
	Location Location
	User     string
	Rating   Rating
}

var TransportStopTypes = []string{
	"Bus Stop",
	"Train Stop",
}

type TransportStop struct {
	Type     string
	Name     string
	Location Location
}

type Edge struct {
	From TransportStop
	To   TransportStop
	Time time.Time
}

type Route struct {
	Edges []Edge
}

type Transport struct {
	Type string
	Id   string
}

type NamedRoute struct {
	Edges     []Edge
	Transport Transport
}

type Schedule struct {
	Routes []NamedRoute
}
