var Schema = GLOBAL.mongoose.Schema;
var userSchema = new Schema({
	firstname: {type: String},
	lastname: {type: String},
	phoneno: {type: String},
	createdDate: {type: Number},
	modifiedDate: {type: Number}
},{
	collection:'user',
	versionKey: false
});

mongoose.model('User', userSchema)
GLOBAL.User = mongoose.models.User;