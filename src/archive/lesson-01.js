"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_json_1 = __importDefault(require("../src/data/data.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(data_json_1.default);
});
app.get('/watched', (req, res) => {
    res.send(data_json_1.default.shows.filter((watched) => watched.isWatched));
});
app.get('/not-watched', (req, res) => {
    res.send(data_json_1.default.shows.filter((watched) => watched.isWatched === false));
    //  res.send(musicals.shows.filter((watched) => !watched.isWatched))
});
// Have a read up on truthy/falsy
app.listen(3000, () => {
    console.log('Server started...');
});
// Make a JSON file in the src 
// To include details of different theatre productions I have seen 
// Ones to watch 
// Clear way to differentiate them 
// Print the JSON list in browser 
// import JSON file
// passing it to res.send?? res.JSON?? 
// STRETCH GOAL:
// Change the get endpoint so that you only return productions that I have seen
// Second one that I haven't seen.`
/*
Resources:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter <--- THIS HELPED!



https://expressjs.com/en/5x/starter/basic-routing/
https://www.w3schools.com/whatis/whatis_json.asp

// Source - https://stackoverflow.com/a/50610545
// Posted by Attersson, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-16, License - CC BY-SA 4.0

tArr = [{name: "hi",id: 1},{name: "hola",id: 2},{name: "hello",id: 3},{name: "bye",id: 4}];

const filterTasks = (taskArray, obj) => taskArray.filter( task => Object.keys(task).some( key => obj[key] && obj[key]==task[key]));

console.log(filterTasks(tArr,{name:"hi",id:2}));

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter



// console.log(typeof musicals) musicals is typeof object
// console.log(typeof musicals.shows)

// console.log(Object.keys(musicals.shows[1]))

// const result = Object.entries(musicals).filter(([key, value]) => key.startsWith('isWatched')).map((key, value) => value)
// console.log('I am the result', result)
// console.log(Object.entries(musicals.shows).filter(([key, value]) => value.isWatched(true)).map((key, value) => value))
*/
/*
// Source - https://stackoverflow.com/a/61229488
// Posted by CherryDT
// Retrieved 2026-09-22, License - CC BY-SA 4.0

const result = Object.entries(data)
  .filter(([key, value]) => key.endsWith('A'))
  .map(([key, value]) => value)
console.log(result) // [{id: 'idA', markdown: 'markdownA'}]
*/
// const filterTasks = (taskArray, obj) => taskArray.filter( task => Object.keys(task).some( key => obj[key] && obj[key]==task[key]));
// const availableMovies = movies.filter((film) => film.genre === req.params.genre && film.available === true).map(({ internalNotes, ...rest }) => rest)
/*// Source - https://stackoverflow.com/a/4608062
// Posted by Christian C. Salvadó, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-16, License - CC BY-SA 4.0

function valuesToArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}
*/
// app.post('/', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });
// app.put('/musical', (req: Request, res: Response) => {
//   res.send('Got a PUT request at /musical');
// });
// app.delete('/musical', (req: Request, res: Response) => {
//   res.send('Got a DELETE request at /musical');
// });
//# sourceMappingURL=lesson-01.js.map