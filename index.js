// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// app.get('/news', (req, res) => {
//     res.json({
//         articles: [
//             { title: "Sample Article", description: "This is a sample description.", url: "https://example.com" },
//         ]
//     });
// });

// const PORT = 8081;
// app.listen(PORT, () => {
//     console.log(`Server is running on http:
// });

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/news', (req, res) => {
    res.json({
        articles: [
            {
                title: "Sample Article",
                description: "This is a sample description.",
                url: "https://example.com"
            },
        ]
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
