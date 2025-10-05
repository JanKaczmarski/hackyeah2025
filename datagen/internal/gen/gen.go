package gen

import (
	"datagen/internal/types"
	"fmt"
	"math"
	"math/rand"
	"time"
)

var (
	startOfDisruptionsInterval = time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
	endOfDisruptionsInterval   = time.Date(2025, 12, 31, 23, 59, 59, 0, time.UTC)
	characters                 = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
)

var (
	cracowTS11 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS11",
		Location: types.Location{
			Latitude:  50.051464700826706,
			Longitude: 19.924332479407283,
		},
	}
	cracowTS12 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS12",
		Location: types.Location{
			Latitude:  50.04950835889272,
			Longitude: 19.930799004861854,
		},
	}
	cracowTS13 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS13",
		Location: types.Location{
			Latitude:  50.050227024380455,
			Longitude: 19.944726905840927,
		},
	}
	cracowTS14 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS14",
		Location: types.Location{
			Latitude:  50.049787841194544,
			Longitude: 19.956354216033276,
		},
	}
	cracowTS15 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS15",
		Location: types.Location{
			Latitude:  50.04894938940644,
			Longitude: 19.965059154145198,
		},
	}

	cracowTS21 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS21",
		Location: types.Location{
			Latitude:  50.052941885768284,
			Longitude: 19.977930026924966,
		},
	}
	cracowTS22 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS22",
		Location: types.Location{
			Latitude:  50.05849090399832,
			Longitude: 19.920788326033144,
		},
	}
	cracowTS23 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS23",
		Location: types.Location{
			Latitude:  50.05773244296766,
			Longitude: 19.93627068024649,
		},
	}
	cracowTS24 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS24",
		Location: types.Location{
			Latitude:  50.05689412998395,
			Longitude: 19.948955018638145,
		},
	}
	cracowTS25 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS25",
		Location: types.Location{
			Latitude:  50.05549690912801,
			Longitude: 19.959711835019302,
		},
	}
	cracowTS26 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS26",
		Location: types.Location{
			Latitude:  50.05896992583994,
			Longitude: 19.976562108078806,
		},
	}

	cracowTS31 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS31",
		Location: types.Location{
			Latitude:  50.063999366420965,
			Longitude: 19.913762197414236,
		},
	}
	cracowTS32 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS32",
		Location: types.Location{
			Latitude:  50.06419893651921,
			Longitude: 19.931420786155563,
		},
	}
	cracowTS33 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS33",
		Location: types.Location{
			Latitude:  50.064877468642436,
			Longitude: 19.953183131435363,
		},
	}
	cracowTS34 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS34",
		Location: types.Location{
			Latitude:  50.06371996688854,
			Longitude: 19.966240538603248,
		},
	}
	cracowTS35 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS35",
		Location: types.Location{
			Latitude:  50.06575555478914,
			Longitude: 19.980479330229173,
		},
	}

	cracowTS41 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS41",
		Location: types.Location{
			Latitude:  50.07174207735687,
			Longitude: 19.910528934686955,
		},
	}
	cracowTS42 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS42",
		Location: types.Location{
			Latitude:  50.07018565337543,
			Longitude: 19.929306729756952,
		},
	}
	cracowTS43 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS43",
		Location: types.Location{
			Latitude:  50.070704466981915,
			Longitude: 19.93913087419755,
		},
	}
	cracowTS44 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS44",
		Location: types.Location{
			Latitude:  50.07030538009048,
			Longitude: 19.9526857064004,
		},
	}
	cracowTS45 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS45",
		Location: types.Location{
			Latitude:  50.069706743526204,
			Longitude: 19.962572028970367,
		},
	}
	cracowTS46 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS46",
		Location: types.Location{
			Latitude:  50.06962692475306,
			Longitude: 19.97662428620818,
		},
	}

	cracowTS51 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS51",
		Location: types.Location{
			Latitude:  50.07641104622025,
			Longitude: 19.92681960458212,
		},
	}
	cracowTS52 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS52",
		Location: types.Location{
			Latitude:  50.07665046826635,
			Longitude: 19.93925523045629,
		},
	}
	cracowTS53 = types.TransportStop{
		Type: "Bus Stop",
		Name: "CBS53",
		Location: types.Location{
			Latitude:  50.07712930877187,
			Longitude: 19.956789462938875,
		},
	}
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
	schedule := types.Schedule{
		Routes: []types.NamedRoute{
			{
				Edges: []types.Edge{
					{
						From:     cracowTS11,
						To:       cracowTS22,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS22,
						To:       cracowTS33,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS33,
						To:       cracowTS44,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS44,
						To:       cracowTS53,
						Duration: 5 * time.Minute,
					},
				},
				Transport: types.Transport{
					Type: "Bus",
					Id:   "501",
				},
			},
			{
				Edges: []types.Edge{
					{
						From:     cracowTS15,
						To:       cracowTS26,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS26,
						To:       cracowTS34,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS34,
						To:       cracowTS43,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS43,
						To:       cracowTS52,
						Duration: 5 * time.Minute,
					},
				},
				Transport: types.Transport{
					Type: "Bus",
					Id:   "511",
				},
			},
			{
				Edges: []types.Edge{
					{
						From:     cracowTS13,
						To:       cracowTS22,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS22,
						To:       cracowTS33,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS33,
						To:       cracowTS43,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS43,
						To:       cracowTS52,
						Duration: 5 * time.Minute,
					},
				},
				Transport: types.Transport{
					Type: "Bus",
					Id:   "411",
				},
			},
			{
				Edges: []types.Edge{
					{
						From:     cracowTS21,
						To:       cracowTS22,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS22,
						To:       cracowTS23,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS23,
						To:       cracowTS24,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS24,
						To:       cracowTS25,
						Duration: 5 * time.Minute,
					},
					{
						From:     cracowTS25,
						To:       cracowTS26,
						Duration: 5 * time.Minute,
					},
				},
				Transport: types.Transport{
					Type: "Bus",
					Id:   "401",
				},
			},
		},
	}

	for i, route := range schedule.Routes {
		for j, edge := range route.Edges {
			distance := distance(edge.From.Location, edge.To.Location)
			edge.Duration = time.Duration(1.3 * distance / 40 * float64(time.Hour.Nanoseconds()))
			route.Edges[j] = edge
		}
		schedule.Routes[i] = route
	}

	return schedule
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

func (g Generator) stringelement(slice []string) string {
	return slice[g.generator.Intn(len(slice))]
}

func (g Generator) edgeelement(slice []types.Edge) types.Edge {
	return slice[g.generator.Intn(len(slice))]
}

func distance(l1, l2 types.Location) float64 {
	const R = 6371

	lat1Rad := float64(l1.Latitude * math.Pi / 180)
	lon1Rad := float64(l1.Longitude * math.Pi / 180)
	lat2Rad := float64(l2.Latitude * math.Pi / 180)
	lon2Rad := float64(l2.Longitude * math.Pi / 180)

	dlat := float64(lat2Rad - lat1Rad)
	dlon := float64(lon2Rad - lon1Rad)

	a := math.Sin(dlat/2)*math.Sin(dlat/2) +
		math.Cos(lat1Rad)*math.Cos(lat2Rad)*math.Sin(dlon/2)*math.Sin(dlon/2)

	c := 2 * math.Asin(math.Sqrt(a))

	distance := R * c
	return distance
}
