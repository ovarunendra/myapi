var Factory = function(Schema,mongoose) {
	this.Schema = Schema;
	this.mongoose = mongoose;
	this.Item = null;
	this.createSchemas = function() {
		LogData = new this.Schema({
			user_id: Number,
			log_data: String, 
			datetime: Number
		});
		this.logData = mongoose.model('jivalogData',LogData);
		//console.log(this.logData)
	};
	this.insertLogData = function(logdata) {
		var oneLogRec = new this.logData(logdata);
        console.log('insert');
        console.log(oneLogRec);
		oneLogRec.save();
	};
	this.getLogData = function(query,res) {
		this.logData.find(query,function(error,output) {
			res.json(output);
		});
	};
    this.updateLogData = function(req, res){
        var updateRec = new this.logData({user_id: req.params.user_id, log_data: req.params.log_data});
        var upsertData = updateRec.toObject();
        delete upsertData._id;
        return this.logData.update({ _id: req.params.log_id }, upsertData, {upsert: true}, function(err) {
            if (!err) {
                return res.send("Log updated");
            } else {
                console.log(err);
                return res.send(404, { error: "Log was not updated." });
            }
        });
    };
    this.deleteData = function(req,res) {
        return this.logData.remove({ _id: req.params.log_id }, function(err) {
            if (!err) {
                return res.send("deleted");
            } else {
                console.log(err);
                return res.send(404, { error: "Log was not deleted." });
            }
        });
    };
};
module.exports = Factory;
