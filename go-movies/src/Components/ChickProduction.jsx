import { useLocation, useParams } from "react-router";
import {useHistory} from "react-router-dom";
import Collapsible from "./form-components/Collapsible";

export default function ChickProduction() {
    const {state: {production}} = useLocation(); // hook to enable us get the pathname, and state sent from clicking the link
    const { chick } = useParams();
    const history = useHistory();

    return (
        <div>
            <div className="d-flex gap-3 align-items-center mb-5">
                <button className="btn btn-outline-dark" onClick={history.goBack}>Back</button>
                <h2>{chick} : Production</h2>
            </div>

            {/*<pre>*/}
            {/*    {JSON.stringify(production, null, 4)}*/}
            {/*</pre>*/}

            {production?.map(chick => (
                <div key={chick.ID} className="card mb-3 p-3">
                    <Collapsible label={chick.title}>
                        <h2>{chick.title}</h2>
                        <p>Total Eggs: {chick.Production.eggs}</p>
                        <p>Dirty Eggs: {chick.Production.dirty}</p>
                        <p>Wrong shape: {chick.Production.wrong_shape}</p>
                        <p>Weak Shell: {chick.Production.weak_shell}</p>
                        <p>Damaged Eggs: {chick.Production.damaged}</p>
                        <p>Hatching Eggs: {chick.Production.hatching_eggs}</p>
                    </Collapsible>
                </div>

            ))}
        </div>
    );
};