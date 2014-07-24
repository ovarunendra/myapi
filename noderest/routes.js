/**
 * Created by ovarunendra on 7/24/14.
 */
module.exports = function(app){
    var musicians = require('./controllers/musicians');
    app.get('/musicians', musicians.findAll);
    app.get('/musicians/:id', musicians.findById);
    app.post('/musicians', musicians.add);
    app.put('/musicians/:id', musicians.update);
    app.delete('/musicians/:id', musicians.delete);

    app.get('/import', musicians.import);
};