const express = require('express')
const { connected, isConnected } = require('./db');
const router = require('./routes');
const cors = require("cors");
const port = 3200
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
    try{
        res.json({
            database : isConnected() ? 'connected' : 'disconnected'}
        )
    }
    catch(err){
        console.log(err)
    }
})

if (require.main === module) {
    connected()
    app.listen(port, async () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  }