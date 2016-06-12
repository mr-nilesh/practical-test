var Schema = GLOBAL.mongoose.Schema;
var ObjectId = Schema.ObjectId;
var timeslotSchema = new Schema({
	slot: {type: String},
	createdDate: {type: Number},
	modifiedDate: {type: Number}
},{
	collection:'timeslot',
	versionKey: false
});

mongoose.model('Timeslot', timeslotSchema)
GLOBAL.Timeslot = mongoose.models.Timeslot;