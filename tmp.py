import matplotlib.pyplot as plt
from numpy import ediff1d

points = []  # zapisane punkty
edges = []


def onclick(event):
    print("On click called")
    if event.dblclick:  # reagujemy tylko na podwójny klik
        x, y = event.xdata, event.ydata
        if x is None or y is None:  # kliknięcie poza obszarem
            return

        points.append((x, y))
        print(f"Dodano punkt: {(x, y)}")

        # rysowanie punktu
        plt.scatter(x, y, c="red", s=50)

        # rysowanie linii jeśli mamy co najmniej 2 punkty
        if len(points) >= 2:
            x_vals, y_vals = zip(*points[-2:])
            edges.append((x_vals, y_vals))
            plt.plot(x_vals, y_vals, c="blue")

        plt.draw()


# tworzymy figurę
fig, ax = plt.subplots()
ax.set_title("Podwójny klik = dodaj punkt, kolejne punkty łączone linią")
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.set_xticks(range(11))
ax.set_yticks(range(11))
ax.grid(True)

# podpinamy event
cid = fig.canvas.mpl_connect("button_press_event", onclick)

plt.show()

print(points)
print(edges)
