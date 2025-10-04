package gen

import (
	"datagen/internal/types"
	"math/rand"
	"strconv"
	"time"
)

var startOfDisruptionsInterval = time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
var endOfDisruptionsInterval = time.Date(2025, 12, 31, 23, 59, 59, 0, time.UTC)
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

func (g Generator) Schedule() types.Schedule {
    // TODO: fill-in using real data
	return types.Schedule{}
}

func (g Generator) Users() []types.User {
    edges := g.Schedule().ToEdges()
	disruptions := g.allDisruptions(&edges)
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
	var result []types.User
	for _, user := range users {
		result = append(result, user)
	}
	return result
}

func (g Generator) allDisruptions(edges *[]types.Edge) []types.Disruption {
    now := time.Now()
	var disruptions []types.Disruption
	for _ = range 10_000 { // disruptions count
        curr := g.Disruption(edges)
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

func (g Generator) Disruption(edges *[]types.Edge) types.Disruption {
	edge := (*edges)[g.intrange(0, len(*edges))]
	return types.Disruption{
		Type:       g.stringelement(types.DisruptionTypes),
		Edge:       edge,
		User:       "dummy_" + strconv.Itoa(g.intrange(0, 500)),
		Rating:     g.Rating(-500, 500),
		ReportedAt: g.randomDate(),
	}
}

func (g Generator) Disruptions() []types.Disruption {
	schedule := g.Schedule()
	edges := schedule.ToEdges()
	all := g.allDisruptions(&edges)
	var res []types.Disruption
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
