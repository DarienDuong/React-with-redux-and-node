const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

const api = axios.create({
  baseURL: 'https://od-api.oxforddictionaries.com/api/v1',
  timeout: 1000,
  headers: {'app_id': '5f6e8b55', 'app_key': '52825d9d3d73e28471d4641d38580729'}
})

app.get("/api/:term", (req, res) => {
  api.get(`/entries/en/${req.params.term}/synonyms`)
    .then(response => {
      var subsenses = response.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses
      var result = []
      for(let i=0; i<subsenses.length; i++){
        for(let j=0; j<subsenses[i].synonyms.length; j++){
          result.push(subsenses[i].synonyms[j]['text'])
        }
      }
      return res.json({data: result})
    })
    .catch(err => res.json({error: 'Please pick a proper word'}))
})

app.listen(4000, function() {
  console.log(
    "The server has started on port 4000. Head to localhost:4000 in the browser and see what's there!"
  );
});