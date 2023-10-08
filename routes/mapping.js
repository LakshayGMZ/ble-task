var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getData', function(req, res, next) {
  res.json(req.app.locals.geoLocation);
});

router.post('/postData', (req, res) => {
  const geoLocation = req.body;
  console.log(geoLocation);
  if (geoLocation.longitude && geoLocation.latitude) {
    req.app.locals.geoLocation = geoLocation;
    res.sendStatus(200);
  } else {
    throw new Error('data not complete');
  }

})

module.exports = router;
