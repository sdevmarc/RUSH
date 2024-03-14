const app = require('./App');

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});