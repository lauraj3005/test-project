import express from 'express'
import { type Request, type Response } from 'express'
import database from '../data/database'

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  const query = database.prepare('SELECT * FROM Shows'); 
  res.send(query.all())
})

app.delete('/delete', (req: Request, res: Response) => {
  const showName = req.body.name
  const query = database.prepare('DELETE FROM Shows WHERE name = ?'); 
  query.all(showName)
  const search = database.prepare('Select * FROM Shows WHERE name = ?'); 
  const result = search.get(showName)
  console.log(result)
  if (result) {
    res.status(500).send('Show could not be deleted')
  } else {
    res.sendStatus(200)
  }
})

//, isWatched, rating, review, writtenBy, timesSeen

app.post('/create', (req: Request, res: Response) => {
  const showName = req.body.name
  if (showName) {
    const createShow = database.prepare('INSERT INTO Shows (name) VALUES (?)')
    createShow.get(showName)
    const search = database.prepare('Select * FROM Shows WHERE name = ?'); 
    res.send(search.get(showName))
  } else {
    res.status(400).send('Missing name')
  }
})

// HW 
// do an update endpoint to update a show
// Read up on put vs patch http (one is for replacing completely, patch is for update specifics)
// https://www.w3schools.com/sql/sql_update.asp
// REMIND SAM - consolidate the endpoints into a single shows entity 

// app.patch('/update', (req: Request, res: Response) => {
//     // const timeSeen = '6'
//     // const showNameToUpdate = 'SIX'

//     const updateShow = database.prepare("UPDATE Shows SET timesSeen='29' WHERE name='SIX'")
//     res.send(updateShow.get())
// }) // this works for hardcoded values... how to make it dynamic :/ 

app.patch('/update', (req: Request, res: Response) => {
  const timesSeen = req.query.timesSeen
  const show = req.query.show
  const updateShow = database.prepare(`UPDATE Shows SET timesSeen = ${timesSeen} WHERE name = '${show}'`)
  res.send(updateShow.all())
})
// how can I do this for different/multiple attributes🤔 ie timesSeen && rating... or rating and review... HMMMmmm. 
// I need to send a json and update only the bits that are sent...

app.put('/update', (req: Request, res: Response) => {

})

app.listen(3000, () => {
  console.log('Server started...')
})
