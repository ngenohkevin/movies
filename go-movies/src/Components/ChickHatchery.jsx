import { useLocation, useParams } from "react-router";
import {useHistory} from "react-router-dom";
import Collapsible from "./form-components/Collapsible";

export default function ChickHatchery() {
    const { chick } = useParams(); // hook to get the name of the chick in the url... e.g /chicks/:chick/hatchery
    const { state: {hatchery} } = useLocation(); // hook to enable us get the pathname, and state sent from clicking the link
    const history = useHistory()

    return (
        <div>
            <div className="d-flex gap-3 align-items-center mb-5">
                <button className="btn btn-outline-dark" onClick={history.goBack}>Back</button>
                <h2>{chick} : Hatchery </h2>
            </div>

            {/*<pre>*/}
            {/*    {JSON.stringify(hatchery, null, 4)}*/}
            {/*</pre>*/}

            {hatchery?.map(chick => (
                <div key={chick.ID} className="card mb-3 p-3">
                    <Collapsible label={chick.title}>
                        <h2>{chick.title}</h2>
                        <p>Infertile: {chick.Hatchery.infertile}</p>
                        <p>Hatched Early: {chick.Hatchery.early}</p>
                        <p>Hatched Middle: {chick.Hatchery.middle}</p>
                        <p>Hatched Late: {chick.Hatchery.late}</p>
                        <p>Dead Chicks: {chick.Hatchery.dead_chicks}</p>
                        <p>Alive Chicks: {chick.Hatchery.alive_chicks}</p>
                    </Collapsible>
                </div>
            ))}
        </div>
    );
}