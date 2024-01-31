import axios from "axios";
import express, {Express} from "express";
import path from "path";
import {env} from "../env";
import Handler from "./handler";

class Server {
    public server: Express;

    constructor() {
        const handler = new Handler(axios.create({baseURL: env.API_URL}).get)
        this.server = express();
        this.server
            .use(
                "/public",
                express.static(path.join(__dirname, "../public"))
            )
            .get("/:shop/book", handler.bookingHandler.bind(this));
    }
}

const {server} = new Server();

export {server};
