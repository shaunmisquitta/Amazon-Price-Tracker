const router = require('express').Router()
const verifylogin = require('../middleware/verifylogin')
let dashboard  = require('../models/dashboard.model')
let user = require('../models/user.model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

router.get('',(req,res) => {
    dashboard.find()
    .then(response => res.json(response))
    .catch(err=>{res.status(400).json('Error' + err)})

})

router.post('/add',(req,res) => {
    const tracking_data = {
        _id: new mongoose.Types.ObjectId(),
        username :req.body.username,
        tracking_data : []
       }
    const new_tracking_info = new dashboard(tracking_data)
    new_tracking_info.save()
    .then((info) => res.json({
        username:info.username,
        tracking_data:info.tracking_data
    }))
    .catch(err=>{res.status(400).json('Error' + err)})
})

router.patch('/additem',verifylogin,async(req,res) => {

  data = req.body
  data._id =new mongoose.Types.ObjectId()
  
  const token = req.header('auth-token')
  const decoded = jwt.verify(token,process.env.token_secret);
  const response = await user.find({'_id':decoded.id})
  
  dashboard.update({'username':response[0].username},{$push :{"tracking_data": data }})
  .then(response => res.json(response))
  .catch(err=>{res.status(400).json('Error' + err)})
})


router.delete('/deleteitem/:id',async(req,res) =>{
    const token = req.header('auth-token')
    const decoded = jwt.verify(token,process.env.token_secret);
    const response = await user.find({'_id':decoded.id})

    dashboard.update({'username':response[0].username},{$pull :{"tracking_data":{ "_id": mongoose.Types.ObjectId(req.params.id) }}})
    .then(ress => res.json(ress))
    .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;

/*
dashboard.update({'username': 'shaun'},{$pull :{"tracking_data":{ "id":"001"}}})
ADD ITEM 
{
	"name_of_prod":"Mouseeeeee",
	"price_tresh" : "500",
	"current_price" : "600"
}


LOGIN

{
	"username":"shaun",
	"password":"meowmeow75"
}

ADD PLAIN DASHBOARD
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTVhMjUzMDQ2OGYyMDViNTU4ODBiNCIsImlhdCI6MTU3ODg0NTQ0MSwiZXhwIjoxNTc4ODQ5MDQxfQ.AYGhMFwXLcWodocPPMhoKBl7KVcn-iL8oCzChc_J13g
*/
