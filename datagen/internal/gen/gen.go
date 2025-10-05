package gen

import (
	"datagen/internal/types"
	"fmt"
	"math/rand"
	"time"
)

var (
	startOfDisruptionsInterval = time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
	endOfDisruptionsInterval   = time.Date(2025, 12, 31, 23, 59, 59, 0, time.UTC)
	characters                 = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
)

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

func (g Generator) Schedule() types.Schedule {
	return types.Schedule{
		Routes: []types.NamedRoute{},
	}
}

func (g Generator) Users() []types.User {
	edges := g.Schedule().ToEdges()

	disruptions := g.allDisruptions(edges)
	users := make(map[string]types.User)
	for _, disruption := range disruptions {
		user, exists := users[disruption.User]
		if !exists {
			user = types.User{
				Username:       disruption.User,
				HashedPassword: "",
				Rating:         types.Rating{},
			}
		}
		user.Rating.Upvotes += disruption.Rating.Upvotes
		user.Rating.Downvotes += disruption.Rating.Downvotes
		users[disruption.User] = user
	}

	result := make([]types.User, 0)
	for _, user := range users {
		result = append(result, user)
	}
	return result
}

func (g Generator) allDisruptions(edges []types.Edge) []types.Disruption {
	now := time.Now()

	disruptions := make([]types.Disruption, 0)
	for range 10_000 {
		edge := g.edgeelement(edges)
		curr := g.Disruption(edge)
		if curr.ReportedAt.After(now) {
			continue
		}
		disruptions = append(disruptions, curr)
	}
	return disruptions
}

func (g Generator) randomDate() time.Time {
	unix := g.int64range(startOfDisruptionsInterval.Unix(), endOfDisruptionsInterval.Unix())
	return time.Unix(unix, 0)
}

func (g Generator) Disruption(edge types.Edge) types.Disruption {
	id := g.intrange(0, 500)
	return types.Disruption{
		Type:       g.stringelement(types.DisruptionTypes),
		Edge:       edge,
		User:       fmt.Sprintf("dummy_%d", id),
		Rating:     g.Rating(-50, 50),
		ReportedAt: g.randomDate(),
	}
}

func (g Generator) Disruptions() []types.Disruption {
	edges := g.Schedule().ToEdges()
	all := g.allDisruptions(edges)
	res := make([]types.Disruption, 0)
	for _, disruption := range all {
		if disruption.Alive() {
			res = append(res, disruption)
		}
	}
	return res
}

func (g Generator) int64range(from, to int64) int64 {
	return g.generator.Int63n(to-from) + from
}

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

func (g Generator) edgeelement(slice []types.Edge) types.Edge {
	return slice[rand.Intn(len(slice))]
}
