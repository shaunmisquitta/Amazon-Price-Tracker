const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
	
	
	username:{
        type:String,
        required:true,
        unique:true,
        minlength:3
    },

    tracking_data:{
        type:Array,
        required:true,
        
    }
    

},{collection:'tracking_data'})

const Dashboard= mongoose.model('tracking_data',DashboardSchema)
module.exports = Dashboard;

/*
{
	"username":"test1",
	"tracking_info":[
		{
			"id":1,
			"name_of_prod":"type C Cable",
			"price_tresh":"300"
		},
		{ "id":2,
			"name_of_prod":"Logitech Mouse",
			"price_tresh":"4000"
	},
		{	"id":3,
			"name_of_prod":"LG Monitor",
			"price_tresh":"30000"
	}
	]
}
*/