// Node.js backend code
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Get votes
app.get('/votes', (req, res) => {
    fs.readFile('votes.json', (err, data) => {
        if (err) return res.status(500).send('Error reading votes');
        res.json(JSON.parse(data));
    });
});

// Submit a vote
app.post('/votes', (req, res) => {
    const newVote = req.body;
    fs.readFile('votes.json', (err, data) => {
        if (err) return res.status(500).send('Error reading votes');
        const votes = JSON.parse(data);
        votes.push(newVote);
        fs.writeFile('votes.json', JSON.stringify(votes), (err) => {
            if (err) return res.status(500).send('Error saving vote');
            res.status(201).send('Vote added');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});