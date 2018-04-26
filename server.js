// init project
const express = require('express')
const app = express()

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/:date", function (req,res) {
  var str = req.params.date;
  var date = new Date(str);
  
  // Check to see if natural
  if (isNaN(date)) {
    date = new Date(Number(str)*1000);
    if (isNaN(date)) {
      res.status(400).send({unix:null, natural:null});
      return;
    }
  }
  
  var response = {
    unix: Math.round(date.getTime()/1000),
    natural: MONTH_NAMES[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()
  }
  res.status(200).send(response);
});

const listener = app.listen(process.env.PORT)