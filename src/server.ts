import express from "express"

const app = express()

app.get('/productions', (req, res) => {
  res.send('Laura')
})

app.listen(3000, () => {
  console.log('Hello World')
})


// Make a JSON file in the src 
// To include details of different theatre productions I have seen
// Ones to watch
// Clear way to differentiate them

// Print the JSON list in browser

// import JSON file
// passing it to res.send?? res.JSON?? 

// STRETCH GOAL:

// Change the get endpoint so that you only return productions that I have seen
// Second one that I haven't seen.