/**
 * Created by ovarunendra on 7/24/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MusicianSchema = new Schema({
    name: String,
    band: String,
    instrument: String
});

mongoose.model('Musician', MusicianSchema);