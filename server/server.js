const express=require('express');
const app=express();
const bodyParser =require('body-parser');
const db=require('./services/movieDb');

app.use(bodyParser.json());

app.get('/api/movies', function(req, res)
{
  res.status(200).send(db.getMovies(req.query))
})

app.post('/api/movies', function(req, res)
{
  req.body //new movie
  if(req.boyd.name)
  {
    db.addMovie(req.body);
    var movies=db.getMovies();
    req.send(movies[movies.length-1]);
  }
  else
  {
      req.send(400).send("Must supply name");
  }
})

app.put('/api/movies/vote/:id', function(req, res)
{
  db.upvoteMovie(req.params.id);
  var movie = db.getMovie(req.params.id);
  res.send(`your vote for ${movie.name} has been cast, ${movie.votes} times`);
})

app.put('/api/movies/:id', (req, res) =>{
  db.updateMovie(req.params.id, req.body)
  res.send(db.getMovie(req.params.id));
})

app.listen(3000, function(){
console.log("Listening to port 3000");
})
