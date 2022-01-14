import {useEffect, useState, Fragment} from "react";
import Collapsible from "./form-components/Collapsible";
import axios from "axios";


export default function AllChicks() {
    const [Kuroiler, setKuroiler] = useState([]);
    const [Rainbowrooster, setRainbowrooster] = useState([]);
    const [Broilers, setBroilers] = useState([]);
    const [Layers, setLayers] = useState([]);
    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState();

    const fetchAllChicks = () => {
        const KuroilerApi = 'https://flockmanager.herokuapp.com/v1/kukuchic/kuroiler'
        const RainbowroosterApi = 'https://flockmanager.herokuapp.com/v1/kukuchic/rainbowrooster'
        const BroilerApi = 'https://flockmanager.herokuapp.com/v1/kukuchic/broiler'
        const LayersApi = 'https://flockmanager.herokuapp.com/v1/kukuchic/layers'

        const getKuroiler = axios.get(KuroilerApi)
        const getRainbowrooster = axios.get(RainbowroosterApi)
        const getBroiler = axios.get(BroilerApi)
        const getLayers = axios.get(LayersApi)

        axios.all([getKuroiler, getRainbowrooster, getBroiler, getLayers]).then(
            axios.spread((...allChicks) => {
                const allKuroiler = allChicks[0].data.kuroiler;
                const allRainbowrooster = allChicks[1].data.rainbowrooster;
                const allBroiler = allChicks[2].data.broilers; // returns broilers not broiler
                const allLayers = allChicks[3].data.layers;

                setKuroiler(allKuroiler)
                setRainbowrooster(allRainbowrooster)
                setBroilers(allBroiler)
                setLayers(allLayers)
            })
        ).catch(error => {
            setError(error)
        }).finally(() => setIsLoaded(true))
    };
    useEffect(() => {
        fetchAllChicks()
    }, []);

    if (!isLoaded) return <p>Loading...</p>
    if (error) return <div>Error: {error?.message || error}</div>
    return (
        <Fragment>
            <h2>All Chicks</h2>
            <hr/>

            <div className="list-group">
                {Kuroiler.map((kr) => (
                    <div key={kr.title} className="card mb-2 p-2">
                        <Collapsible label={kr.title} name=" - Kuroiler">
                            <h3>{kr.title}</h3>
                            <p>Created At: {kr.CreatedAt}</p>
                            <p>Updated At: {kr.UpdatedAt}</p>
                                <h5>Production</h5>
                            <p>Total Eggs: {kr.Production.eggs}</p>
                            <p>Dirty Eggs: {kr.Production.dirty}</p>
                            <p>Wrong Shape {kr.Production.wrong_shape}</p>
                            <p>Weak Shell: {kr.Production.weak_shell}</p>
                            <p>Damaged Eggs: {kr.Production.damaged}</p>
                            <p>Hatching Eggs: {kr.Production.hatching_eggs}</p>
                            <h5> Hatchery </h5>
                            <p>Infertile: {kr.Hatchery.infertile}</p>
                            <p>Hatched Early: {kr.Hatchery.early}</p>
                            <p>Hatched Middle: {kr.Hatchery.middle}</p>
                            <p>Hatched Late: {kr.Hatchery.late}</p>
                            <p>Dead Chicks: {kr.Hatchery.dead_chicks}</p>
                            <p>Alive Chicks: {kr.Hatchery.alive_chicks}</p>
                            <h5>Premises</h5>
                            <p>Farm: {kr.Premises.farm}</p>
                            <p>House: {kr.Premises.house}</p>
                        </Collapsible>
                    </div>
                ))}

            </div>

            <div className="list-group">
                {Rainbowrooster?.map((rr) => (
                    <div key={rr.title} className="card mb-2 p-2">
                        <Collapsible label={rr.title} name=" - Rainbowrooster">
                            <h3>{rr.title}</h3>
                            <p>Created At: {rr.CreatedAt}</p>
                            <p>Updated At: {rr.UpdatedAt}</p>
                            <h5>Production</h5>
                            <p>Total Eggs: {rr.Production.eggs}</p>
                            <p>Dirty Eggs: {rr.Production.dirty}</p>
                            <p>Wrong Shape {rr.Production.wrong_shape}</p>
                            <p>Weak Shell: {rr.Production.weak_shell}</p>
                            <p>Damaged Eggs: {rr.Production.damaged}</p>
                            <p>Hatching Eggs: {rr.Production.hatching_eggs}</p>
                            <h5> Hatchery </h5>
                            <p>Infertile: {rr.Hatchery.infertile}</p>
                            <p>Hatched Early: {rr.Hatchery.early}</p>
                            <p>Hatched Middle: {rr.Hatchery.middle}</p>
                            <p>Hatched Late: {rr.Hatchery.late}</p>
                            <p>Dead Chicks: {rr.Hatchery.dead_chicks}</p>
                            <p>Alive Chicks: {rr.Hatchery.alive_chicks}</p>
                            <h5>Premises</h5>
                            <p>Farm: {rr.Premises.farm}</p>
                            <p>House: {rr.Premises.house}</p>
                        </Collapsible>
                    </div>
                ))}
            </div>
            <div className="list-group">
                {Broilers?.map((br) => (
                    <div key={br.title} className="card mb-2 p-2">
                        <Collapsible label={br.title} name=" - Broiler">
                            <h3>{br.title}</h3>
                            <p>Created At: {br.CreatedAt}</p>
                            <p>Updated At: {br.UpdatedAt}</p>
                            <h5>Production</h5>
                            <p>Total Eggs: {br.Production.eggs}</p>
                            <p>Dirty Eggs: {br.Production.dirty}</p>
                            <p>Wrong Shape {br.Production.wrong_shape}</p>
                            <p>Weak Shell: {br.Production.weak_shell}</p>
                            <p>Damaged Eggs: {br.Production.damaged}</p>
                            <p>Hatching Eggs: {br.Production.hatching_eggs}</p>
                            <h5> Hatchery </h5>
                            <p>Infertile: {br.Hatchery.infertile}</p>
                            <p>Hatched Early: {br.Hatchery.early}</p>
                            <p>Hatched Middle: {br.Hatchery.middle}</p>
                            <p>Hatched Late: {br.Hatchery.late}</p>
                            <p>Dead Chicks: {br.Hatchery.dead_chicks}</p>
                            <p>Alive Chicks: {br.Hatchery.alive_chicks}</p>
                            <h5>Premises</h5>
                            <p>Farm: {br.Premises.farm}</p>
                            <p>House: {br.Premises.house}</p>
                        </Collapsible>
                    </div>
                ))}
            </div>
            <div className="list-group">
                {Layers?.map((ls) => (
                    <div key={ls.title} className="card mb-2 p-2">
                        <Collapsible label={ls.title} name=" - Layers">
                            <h3>{ls.title}</h3>
                            <p>Created At: {ls.CreatedAt}</p>
                            <p>Updated At: {ls.UpdatedAt}</p>
                            <h5>Production</h5>
                            <p>Total Eggs: {ls.Production.eggs}</p>
                            <p>Dirty Eggs: {ls.Production.dirty}</p>
                            <p>Wrong Shape {ls.Production.wrong_shape}</p>
                            <p>Weak Shell: {ls.Production.weak_shell}</p>
                            <p>Damaged Eggs: {ls.Production.damaged}</p>
                            <p>Hatching Eggs: {ls.Production.hatching_eggs}</p>
                            <h5> Hatchery </h5>
                            <p>Infertile: {ls.Hatchery.infertile}</p>
                            <p>Hatched Early: {ls.Hatchery.early}</p>
                            <p>Hatched Middle: {ls.Hatchery.middle}</p>
                            <p>Hatched Late: {ls.Hatchery.late}</p>
                            <p>Dead Chicks: {ls.Hatchery.dead_chicks}</p>
                            <p>Alive Chicks: {ls.Hatchery.alive_chicks}</p>
                            <h5>Premises</h5>
                            <p>Farm: {ls.Premises.farm}</p>
                            <p>House: {ls.Premises.house}</p>
                        </Collapsible>
                    </div>
                ))}
            </div>
        </Fragment>
    );



};