import axios from "axios";

export default axios.create({
    baseURL: "https://flockmanager.herokuapp.com/",
})