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

var DisruptionTypesTtl = map[string]time.Duration{
	"Accident":          time.Minute * 10,
	"Traffic Jam":       time.Minute * 10,
	"Road Closure":      time.Minute * 10,
	"Construction":      time.Minute * 10,
	"Weather Condition": time.Minute * 10,
	"Object on Road":    time.Minute * 10,
}

type Disruption struct {
	Type       string
	Edge       Edge
	User       string
	Rating     Rating
	ReportedAt time.Time
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

func (s Schedule) ToEdges() []Edge {
	seen := make(map[string]bool)
	var result []Edge

	for _, nr := range s.Routes {
		for _, e := range nr.Edges {
			// Create a unique key for the edge
			key := e.From.Type + "|" + e.From.Name + "|" +
				e.To.Type + "|" + e.To.Name + "|"

			if !seen[key] {
				seen[key] = true
				result = append(result, e)
			}
		}
	}
	return result
}

func (d Disruption) Alive() bool {
	ttl := DisruptionTypesTtl[d.Type]
	return time.Now().After(d.ReportedAt) &&
		time.Now().Before(d.ReportedAt.Add(ttl))

}
