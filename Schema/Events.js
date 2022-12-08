const mongoose = require("mongoose");

const EventSchema = {
  eventname: 'string',
  eventdescription: 'string',
  eventimages:'array',
  host:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
}
  //eventdate
};

module.exports = mongoose.model("Events", EventSchema);
