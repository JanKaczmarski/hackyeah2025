package gen

import (
	"datagen/internal/types"
	"fmt"
	"math/rand"
)

var characters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

type Generator struct {
	generator *rand.Rand
}

func NewGenerator(seed int64) Generator {
	source := rand.NewSource(seed)
	generator := rand.New(source)
	return Generator{generator}
}

func (g Generator) Rating(from, to int) types.Rating {
	return types.Rating{
		Upvotes:   g.intrange(from, to),
		Downvotes: g.intrange(from, to),
	}
}

type locationInput struct {
	latitudeMin  float32
	latitudeMax  float32
	longitudeMin float32
	longitudeMax float32
}

var lesserPolandLocationInput = locationInput{
	latitudeMin:  49.365327876304754,
	latitudeMax:  50.38482653777126,
	longitudeMin: 19.376154465097827,
	longitudeMax: 21.378412702293314,
}

func (g Generator) Location(input locationInput) types.Location {
	return types.Location{
		Latitude:  g.floatrange(input.latitudeMin, input.latitudeMax),
		Longitude: g.floatrange(input.longitudeMin, input.longitudeMax),
	}
}

func (g Generator) User() types.User {
	id := g.string(8)
	return types.User{
		Username:       fmt.Sprintf("user-%s", id),
		HashedPassword: g.string(64),
		Rating:         g.Rating(-500, 500),
	}
}

func (g Generator) Disruption(username string) types.Disruption {
	return types.Disruption{
		Type:     g.stringelement(types.DisruptionTypes),
		Location: g.Location(lesserPolandLocationInput),
		User:     username,
		Rating:   g.Rating(-25, 25),
	}
}

func (g Generator) TransportStop() types.TransportStop {
	id := g.string(8)
	return types.TransportStop{
		Type:     g.stringelement(types.TransportStopTypes),
		Name:     fmt.Sprintf("stop-%s", id),
		Location: g.Location(lesserPolandLocationInput),
	}
}

// TODO: Generate edge

func (g Generator) intrange(from, to int) int {
	return g.generator.Intn(to-from) + from
}

func (g Generator) floatrange(from, to float32) float32 {
	return g.generator.Float32()*(to-from) + from
}

func (g Generator) string(length int) string {
	rs := make([]rune, length)
	for i := range rs {
		rs[i] = characters[rand.Intn(len(characters))]
	}
	return string(rs)
}

func (g Generator) stringelement(slice []string) string {
	return slice[rand.Intn(len(slice))]
}
