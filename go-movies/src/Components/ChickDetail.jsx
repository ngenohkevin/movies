import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import API from "../API";

function ChickDetail() {
    const { chick } = useParams();
    const [flock, setFlock] = useState();
    const [isLoaded, setIsLoaded] = useState();
    const [error, setError] = useState();
    const location = useLocation();

    // same as componentDidMount and/or didComponentUpdate in class based components
    useEffect(() => {
        const chick_ = chick.toLowerCase();
        API.get(`/v1/kukuchic/${chick_}`).then(response => {
            setFlock(response.data[chick_])
        }).catch(error => {
            setError(error)
        }).finally(() => setIsLoaded(true))
    }, [chick])

    if (!isLoaded) return <p>Loading...</p>
    if (error) return <div>Error: {error?.message || error}</div>
    return (
        <>
            <h2>Chick: {chick}</h2>

            <div className="list-group">
                <Link
                    to={{
                        pathname: location.pathname + "/production",
                        state: { production: flock },
                    }}
                    className="list-group-item list-group-item-action"
                >
                    Production
                </Link>
                <Link
                    to={{
                        pathname: location.pathname + "/hatchery",
                        state: { hatchery: flock },
                    }}
                    className="list-group-item list-group-item-action"
                >
                    Hatchery
                </Link>
            </div>
        </>
    )
}

export default ChickDetail
