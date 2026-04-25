const express = require('express');
const fs = require('fs'); 
const path = require('path');
const app = express();

// 1. Tell Express to look in the MAIN folder (.) instead of 'public'
app.use(express.static(path.join(__dirname, '.')));
app.use(express.urlencoded({ extended: true })); 

// 2. The Home Page Route - Points to the main folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. The Service Route
app.post('/get-service', (req, res) => {
    const name = req.body.userName;
    const email = req.body.userEmail;
    const phone = req.body.userPhone;
    const entry = `Name: ${name} | Email: ${email} | Phone: ${phone} | Time: ${new Date().toLocaleString()}\n`;

    try {
        // Saving to /tmp/ so it doesn't crash on Vercel
        fs.appendFileSync('/tmp/requests.txt', entry);
    } catch (err) {
        console.log("File save skipped on cloud.");
    }

    res.send(`
        <body style="background-color: #FDF9F0; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; margin: 0;">
            <div style="background: white; padding: 50px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-top: 10px solid #1A2421;">
                <h1 style="color: #1A2421; font-size: 3rem;">Success! ✅</h1>
                <p style="font-size: 1.2rem; color: #555;">LeafFix has received your request.</p>
                <a href="/" style="background: #F4D03F; color: #1A2421; padding: 15px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Return to Home</a>
            </div>
        </body>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LeafFix live on ${PORT}`));