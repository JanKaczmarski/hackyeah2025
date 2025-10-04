from fastapi import APIRouter, HTTPException
import db
import schemas

router = APIRouter(tags=["disruptions"])


@router.post("/", response_model=schemas.DisruptionOut)
def create_disruption(disruption: schemas.DisruptionCreate):
    conn = db.get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO disruptions (type, latitude, longitude, username) VALUES (?, ?, ?, ?)",
        (disruption.type, disruption.location.latitude, disruption.location.longitude, disruption.username)
    )
    conn.commit()
    disruption_id = cur.lastrowid
    conn.close()
    return {
        "id": disruption_id,
        "type": disruption.type,
        "location": disruption.location,
        "username": disruption.username,
        "rating": 0,
    }


@router.get("/", response_model=list[schemas.DisruptionOut])
def list_disruptions():
    conn = db.get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM disruptions")
    rows = cur.fetchall()
    conn.close()
    result = []
    for row in rows:
        result.append({
            "id": row["id"],
            "type": row["type"],
            "location": {"latitude": row["latitude"], "longitude": row["longitude"]},
            "username": row["username"],
            "rating": row["rating"],
        })
    return result


@router.put("/{id}", response_model=schemas.DisruptionOut)
def vote_disruption(id: int, vote: schemas.DisruptionVote):
    conn = db.get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM disruptions WHERE id = ?", (id,))
    row = cur.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Disruption not found")
    if vote.voteType == "like":
        cur.execute("UPDATE disruptions SET rating = rating + 1 WHERE id = ?", (id,))
    elif vote.voteType == "dislike":
        cur.execute("UPDATE disruptions SET rating = rating - 1 WHERE id = ?", (id,))
    else:
        conn.close()
        raise HTTPException(status_code=400, detail="voteType must be like or dislike")
    conn.commit()
    cur.execute("SELECT * FROM disruptions WHERE id = ?", (id,))
    updated_row = cur.fetchone()
    conn.close()
    return {
        "id": updated_row["id"],
        "type": updated_row["type"],
        "location": {"latitude": updated_row["latitude"], "longitude": updated_row["longitude"]},
        "username": updated_row["username"],
        "rating": updated_row["rating"],
    }


@router.delete("/{id}")
def delete_disruption(id: int):
    conn = db.get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM disruptions WHERE id = ?", (id,))
    if not cur.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Disruption not found")
    cur.execute("DELETE FROM disruptions WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return {"message": f"Disruption {id} deleted"}
