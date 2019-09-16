//Return the data for the given mid
const getMeetingData = db => mid => {
  return db.meeting.findByPk(mid);
};

module.exports = db => ({
  getMeetingData: getMeetingData(db)
});
