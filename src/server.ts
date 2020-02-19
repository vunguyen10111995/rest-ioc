import app from "./app-setup";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listen on port ' + PORT);
})
