import express from 'express';

const app = express();

app.use(express.json());

app.listen(3333, () => {
    console.log("server started on port 3333");
})