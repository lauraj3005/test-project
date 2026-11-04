import express from 'express'
import { type Request, type Response } from 'express'
import database from './data/database'

const app = express()

app.use(express.json())

app.get('/shows', (req: Request, res: Response) => {
  const query = database.prepare('SELECT * FROM Shows'); 
  res.send(query.all())
})

app.get('/shows/:id', (req: Request, res: Response) => {
  const query = database.prepare('SELECT * FROM Shows WHERE id = ?');
  if (req.params.id) {
  res.send(query.get(req.params.id as string))
  } else {
    res.sendStatus(404)
  }
})

app.delete('/shows/:id', (req: Request, res: Response) => {
  const showId = req.params.id as string
  const query = database.prepare('DELETE FROM Shows WHERE id = ?'); 
  query.all(showId)
  const search = database.prepare('Select * FROM Shows WHERE id = ?'); 
  const result = search.get(showId)
  console.log(result)
  if (result) {
    res.status(500).send('Show could not be deleted')
  } else {
    res.sendStatus(200)
  }
})

app.post('/shows', (req: Request, res: Response) => {
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

app.get('/shows', (req: Request, res: Response) => {
  const writtenBy = (req.query.writer as string)
  // const query = database.prepare('SELECT * FROM Shows WHERE writtenBy == ?')
  // const query = database.prepare('SELECT * FROM Shows WHERE writtenBy = ?')
    const query = database.prepare("SELECT * FROM Shows WHERE writtenBy LIKE '%' || ? || '%'") 
  //CONTAINS (column_name, 'search_pattern')

  res.send(query.all(writtenBy))
})

app.put('/shows/:id', (req: Request, res: Response) => {
  const { name, isWatched, rating, review, writtenBy, timesSeen } = req.body
    const updateShow = database.prepare('UPDATE Shows SET name = ?, isWatched = ?, rating = ?, review = ?, writtenBy = ?, timesSeen = ? WHERE id = ?')
    updateShow.get(name, isWatched, rating, review, writtenBy, timesSeen, req.params.id as string)
    const search = database.prepare('Select * FROM Shows WHERE id = ?'); 
    res.send(search.get(req.params.id as string))
})

export { app }