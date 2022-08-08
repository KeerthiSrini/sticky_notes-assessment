let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let stickyNotesSchema = new Schema({
    title: { type: String },
    content: { type: String },
    dateTime:{type: Date},
});

let stickyNotesmodel = mongoose.model('sticky_notes', stickyNotesSchema)

function model() {
    return stickyNotesmodel;
}

function create(params, callback) {
    console.log(params);
    model().find({"title":params.title}).then(function (data) {
        if (data.length === 0) {
            return model().create(params);
        } else {
            console.log("Can't Create a new notes")
        }
    }).then(function (success) {
        callback(null, success);
    }).catch(function (error) {
        callback(error, null);
    })
}


function update(title, params, callback) {
    model().findOneAndUpdate({ "title": title }, params, { new: true }, function (err, response) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, response);
        }
    });

}

function getAllNotes(callback) {
    model().find({}, function (error, response) {
        callback(error, response)
    });
}

function remove(email, callback) {
    console.log(email);
    model().deleteOne({ "email": email }, function (error, response) {
        if (error) {
            callback(error, null)
        } else {
            callback(null, response)
        }
    });
}


function getNotesDetails(title,callback) {
    model().find({ "title":title }, function (error, response) {
        if (error) {
            callback(error, null)
        } else {
            callback(null, response)
        }
    });
}

module.exports = {model,update,remove,create,getNotesDetails,getAllNotes};
