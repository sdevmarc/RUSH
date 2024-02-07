const app = require('./App');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
});