const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

const api = axios.create({
  baseURL: 'https://od-api.oxforddictionaries.com/api/v1',
  timeout: 1000,
  headers: { 'app_id': '5f6e8b55', 'app_key': '52825d9d3d73e28471d4641d38580729' }
})

// function recurse(json) {
//   console.log(json)
//   for (let key in json) {
//     console.log(key)
//     if (key === "synonyms") {
//       for (let i = 0; i < json[key].length; i++) {
//         arr.push(json[key][i]["text"])
//       }
//     } if (Array.isArray(json[key])) {
//       for (let i = 0; i < json[key].length; i++) {
//         recurse(json[key][i])
//       }
//     } else if (typeof(json[key]) === "object") {
//       for (let el in obj) {
//         recurse(obj[el])
//       }
//     } else {
//       return
//     }
//   }
// }



app.get("/api/:term", (req, res) => {
  api.get(`/entries/en/${req.params.term}/synonyms`)
    .then(response => {
      var arr = []
      for (let i = 0; i < response.data.results[0].lexicalEntries.length; i++) {
        // console.log(response.data.results[0].lexicalEntries[i])
        for (let j = 0; j < response.data.results[0].lexicalEntries[i].entries[0].senses.length; j++) {
          var obj = response.data.results[0].lexicalEntries[i].entries[0].senses[j]
          // console.log(obj)
          for (var key in obj) {
            if (key === 'subsenses') {
              // console.log(obj[key])
              for (let e = 0; e < obj['subsenses'].length; e++) {
                for (let z = 0; z < obj['subsenses'][e]['synonyms'].length; z++) {
                  // console.log(obj['subsenses'][e]['synonyms'][z]['text'])
                  arr.push(obj['subsenses'][e]['synonyms'][z]['text'])
                }
              }
            } else if (key === 'synonyms') {
              // console.log(obj['synonyms'])
              for (let d = 0; d < obj['synonyms'].length; d++) {
                // console.log(obj['synonyms'][d].text)
                arr.push(obj['synonyms'][d].text)
              }
            }
          }
        }
      }
      // console.log('hi')
      // console.log(arr)


      // var subsenses = response.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses
      // var result = []
      // for (let i = 0; i < subsenses.length; i++) {
      //   for (let j = 0; j < subsenses[i].synonyms.length; j++) {
      //     result.push(subsenses[i].synonyms[j]['text'])
      //   }
      // }
      return res.json({ data: arr })
    })
    .catch(err => res.json({ error: 'Please pick a proper word' }))
})

app.listen(4000, function () {
  console.log(
    "The server has started on port 4000. Head to localhost:4000 in the browser and see what's there!"
  );
});