const router = require('express').Router();
const { Meeting } = require('../database/api');

//Return the data for the given mid
router.get('/api/meeting/:mid', ({ params: { mid } }, response) => {
  return Meeting.getMeetingData(parseInt(mid))
    .then(data => response.json(data))
    .catch(error => response.json(error));
});

module.exports = router;
