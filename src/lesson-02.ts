import express from 'express'
import { type Request, type Response } from 'express'
import database from './data/database'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  const query = database.prepare('SELECT * FROM Shows'); 
  res.send(query.all())
})


// app.get('/watched', (req: Request, res: Response) => {
//   const query = database.prepare('SELECT * FROM Shows WHERE isWatched = 1'); 
//   res.send(query.all())
//   }
// )

// app.get('/not-watched', (req: Request, res: Response) => {
//   const query = database.prepare('SELECT * FROM Shows WHERE isWatched = 0'); 
//   res.send(query.all())
//   }
// )

// MERGES THE ABOVE FILTERING INTO ONE ENDPOINT:
// Watched & non watched in the same endpoint
// localhost:3000/watched?q=1
// app.get('/watched', (req: Request, res: Response) => {
//   const watched = parseInt(((req.query.filter || 1) as string))
//   const query = database.prepare('SELECT * FROM Shows WHERE isWatched = ?'); 
//   res.send(query.all(watched))
//   }
// )

app.get('/watched', (req: Request, res: Response) => {
  const watched = parseInt(((req.query.filter || 1) as string))
  if (watched === 0 || watched === 1) {
    const query = database.prepare('SELECT * FROM Shows WHERE isWatched = ?'); 
    res.send(query.all(watched))
  } else {
    console.log('NO!!')
  }
}
)


// Code for if a filter of not 1 or 2 is entered
// Filter on something else i.e written by so and so // has a rating of 4 etc
// Have a read up on truthy/falsy

app.listen(3000, () => {
  console.log('Server started...')
})