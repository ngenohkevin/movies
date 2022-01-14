import React, {Fragment, useEffect, useState} from 'react';
import Alert from "./ui-components/Alert";
import Select from "./form-components/Select";
import Input from "./form-components/Input";
import {Link} from "react-router-dom";

function InputHatchery(props) {
    const [input, setInput] = useState({
        chick: "",
        title: "",
        Hatchery: {},
    });
    const [error] = useState(null);
    const [errors, setErrors] = useState(null);
    const [alert, setAlert] = useState({type: "d-none", message: ""})
    const chickOptions = [
        { id: "Kuroiler", value: "Kuroiler" },
        { id: "RainbowRooster", value: "RainbowRooster" },
        { id: "Broiler", value: "Broiler" },
        { id: "Layers", value: "Layers" },
    ]
    useEffect(() =>{

    }, [])

    const handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setInput({
            ...input,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const backendData = {};
        for (const field of formData.entries()) {
            const [name, value] = field; // read about destructuring in javascript -> for Objects, Arrays
            if (name === "title" || name === "chick") { // == and === difference in javascript
                backendData[name] = value.trim();
            }
            const[hatchery, input] = field
            if ( hatchery === "infertile" || hatchery === "early" || hatchery === "middle" || hatchery === "late" || hatchery === "dead_chicks" || hatchery === "alive_chicks") {
                backendData["Hatchery"] = {
                    ...backendData["Hatchery"],
                    [hatchery]: parseInt(input),
                }
            }

        }
        console.log(JSON.stringify(backendData, null, 4)); // -> for Debugging purposes

        let errors = [];
        // if (!backendData.chick) {
        //     errors.push("chick")
        // }
        if (!backendData.title) { // if it is null or an empty string
            errors.push("title") //validating title only
        }
        if (errors.length > 0) {
            setErrors(errors)
            return false
        }
        // you can add checks to see if a certain field is empty, eg
        if (!backendData.title) {
            setErrors(otherErrors => [...otherErrors, "The title is required"])
        }

        const myHeaders = new Headers({
            "Content-Type": "application/json"

        });
        //jwt here
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(backendData),
            headers: myHeaders,
        }

        const chick_ = input.chick.toLowerCase();
        const title_ = input.title

        fetch(`https://flockmanager.herokuapp.com/v1/kukuchic/${chick_}/${title_}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlert({
                        alert: {type: "alert-danger", message: data.error.message},
                    })
                } else {
                    props.history.push({
                        pathname: "/all_chicks"
                    });
                }
            });


    };
    function hasError() {
        return errors;
    }

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else { // not necessary
        return (
            <Fragment>
                <h2>Add/Edit Hatchery</h2>
                <Alert
                    alertType={alert.type}
                    alertMessage={alert.message}
                />
                <hr/>
                <form onSubmit={handleSubmit}>

                    <Select
                        title={"Flock"}
                        name="chick"
                        options={chickOptions}
                        value={input.chick}
                        onChange={handleChange}
                        placeholder="Choose..."

                    />

                    <Input
                        title={"Title"}
                        className={hasError("title") ? "is-invalid" : ""}
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={handleChange}
                        errorDiv={hasError("title") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a title"}
                    />

                    <Input
                        title="Infertile"
                        type="number"
                        name="infertile"
                        value={input.Hatchery.infertile}
                        onChange={handleChange}
                    />

                    <Input
                        title="Hatched Early"
                        type="number"
                        name="early"
                        value={input.Hatchery.early}
                        onChange={handleChange}
                    />

                    <Input
                        title="Hatched Middle"
                        type="number" // the rest you can change, lemme demonstrate
                        name="middle"
                        value={input.Hatchery.middle}
                        onChange={handleChange}
                    />
                    <Input
                        title={"Hatched Late"}
                        type="number"
                        name={"late"}
                        value={input.Hatchery.late}
                        onChange={handleChange}
                    />

                    <Input
                        title={"Dead Chicks"}
                        type="number"
                        name={"dead_chicks"}
                        value={input.Hatchery.dead_chicks}
                        onChange={handleChange}
                    />
                    <Input
                        title={"Alive Chicks"}
                        type="number"
                        name={"alive_chicks"}
                        value={input.Hatchery.alive_chicks}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary">Save</button>
                    <Link to="/all_chicks" className="btn btn-warning ms-1">
                        Cancel
                    </Link>
                </form>
            </Fragment>
        );
    }
}

export default InputHatchery