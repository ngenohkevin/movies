import React, {Fragment, useEffect, useState} from 'react';
import Alert from "./ui-components/Alert";
import Select from "./form-components/Select";
import Input from "./form-components/Input";
import {Link} from "react-router-dom";

function InputProduction(props) {
    const [input, setInput] = useState({
        chick: "",
        title: "",
        Production: {},
        Premises: {},
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
    const farmOptions = [
        {id: "Kaptagat", value: "Kaptagat"},
        {id: "Nyaru", value: "Nyaru"},
        {id: "Nandi", value: "Nandi"},
    ];

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
            // else {
            //     backendData[name] = parseInt(value); // if the value can't be converted to an Integer, set the field to null
            //
            //     // [-] chaining operator in javascript, logical OR, AND, ||, &&
            // }
            const[production, input] = field
            if ( production === "eggs" || production === "dirty" || production === "wrong_shape" || production === "weak_shell" || production === "damaged" || production === "hatching_eggs") {
                backendData["Production"] = {
                    ...backendData["Production"],
                    [production]: parseInt(input),
                }

            } if (name === "farm" || name === "house") {
                backendData["Premises"] = {
                    ...backendData["Premises"],
                    [name]: value,
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
        if (!backendData?.Premises) {
            setErrors(otherErrors => [...otherErrors, "The farm field is required"])
        }
        if (!backendData.title) {
            setErrors(otherErrors => [...otherErrors, "The title is required"])
        }

        const myHeaders = new Headers({
            "Content-Type": "application/json"

        });
        //jwt here
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(backendData),
            headers: myHeaders,
        }

        const chick_ = input.chick.toLowerCase();

        fetch(`https://flockmanager.herokuapp.com/v1/kukuchic/${chick_}`, requestOptions)
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
                <h2>Add/Edit Production</h2>
                <Alert
                    alertType={alert.type}
                    alertMessage={alert.message}
                />
                <hr/>
                <form onSubmit={handleSubmit}>
                    {/*<input*/}
                    {/*    type="hidden"*/}
                    {/*    name="id"*/}
                    {/*    id="id"*/}
                    {/*    defaultValue={input.id}*/}
                    {/*    readOnly*/}
                    {/*/>*/}

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
                        title="Number of Eggs"
                        type="number"
                        name="eggs"
                        value={input.Production.eggs}
                        onChange={handleChange}
                    />

                    <Input
                        title="Dirty Eggs"
                        type="number"
                        name="dirty"
                        value={input.Production.dirty}
                        onChange={handleChange}
                    />

                    <Input
                        title="Wrong Shape"
                        type="number" // the rest you can change, lemme demonstrate
                        name="wrong_shape"
                        value={input.Production.wrong_shape}
                        onChange={handleChange}
                    />
                    <Input
                        title={"Weak Shell"}
                        type="number"
                        name={"weak_shell"}
                        value={input.Production.weak_shell}
                        onChange={handleChange}
                    />

                    <Input
                        title={"Damaged Eggs"}
                        type="number"
                        name={"damaged"}
                        value={input.Production.damaged}
                        onChange={handleChange}
                    />

                    <Input
                        title={"Total Hatching Eggs"}
                        type="number"
                        name={"hatching_eggs"}
                        value={input.Production.hatching_eggs}
                        onChange={handleChange}
                    />

                    <Select
                        title={"Farm"}
                        name={"farm"}
                        options={farmOptions}
                        value={input.Premises.farm}
                        onChange={handleChange}
                        placeholder="Select farm..."
                    />
                    <Input
                        title={"House Number"}
                        type={"text"}
                        name={"house"}
                        value={input.Premises.house}
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

export default InputProduction