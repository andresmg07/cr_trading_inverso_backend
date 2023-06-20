const Express = require('express');
const {connectMySQL} = require("./db/connection");

const index = async () => {
    const app = Express();
    app.use(Express.json());
    const  connection = await connectMySQL()
}

index();