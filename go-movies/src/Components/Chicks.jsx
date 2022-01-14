import React, {useEffect, useState, Fragment} from 'react'
import {Link} from "react-router-dom";

export default function Chicks() {

    const [flock, setFlock] = useState([]);
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState();

    useEffect(() =>{
        // API.get("/v1/kukuchic/flock").then( (response) =>{
        //     setFlock(response.status)
        // }).then((json) => {
        //     setFlock(json.flock)
        // }).catch(error => {
        //     setError(error)
        // }).finally(() => setIsLoaded(true))
        fetch("https://flockmanager.herokuapp.com/v1/kukuchic/flock")
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code ", response.status)
                } else {
                    setError(null);
                }
                return response.json();

            })
            .then((json) => {
                setFlock(json.flock)
            }).finally(() => setIsLoaded(true))
    },[]);
    if (!isLoaded) return <p>Loading...</p>
    if (error) return <div>Error: {error?.message || error}</div>
    return (
        <Fragment>
            <h2>Chicks</h2>

            <div className="list-group">
                {flock.map((m) => (
                    <Link
                        key={m.id}
                        className="list-group-item list-group-item-action"
                        to={`/chicks/${m.flock_name}`}
                    >
                        {m.flock_name}
                    </Link>
                ))}
            </div>
        </Fragment>
    );
}