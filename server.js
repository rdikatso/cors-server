const express = require('express'); 
const axios = require('axios'); 
const cors = require('cors'); 

const app = express(); 
const port = 3004; // Updated port 

const corsOptions = {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}

// Middleware to enable CORS 
app.use(cors(corsOptions)); 

// Define a route to proxy the API request 
app.get('/api/getPageRank', function (req, res) {
     const websiteUrl = req.query.websiteUrl; 
     const apiKey = 'o0gsg0c8cs4w484w0o00coccgs44wk0sgg4wk88g'; // Replace with your actual API key 
     axios.get('https://openpagerank.com/api/v1.0/getPageRank', { 
        params: { 
            'domains[0]': websiteUrl, 
        }, 
        headers: { 
            'API-OPR': apiKey, 
        }, 
    }) 
    .then(response => { 
        res.json(response.data); 
    }) 
    .catch(error => { res.status(error.response.status).json(error.response.data); 
    }); 
}); 

// Start the server 
app.listen(port, function () { 
    console.log(`Server is running on http://localhost:${port}`); 
});