const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const Player = require('./playermodal');
const initializeSocket = require('./Socket');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./modals');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: 'dckp3ubkg',
  api_key: '954137826352828',
  api_secret: 'lF3OAF50khe4Qwn4gbhtlm34xns',
});

const server = http.createServer(app);
const io = initializeSocket(server);

app.use(fileupload({
  useTempFiles: true
}));
app.post('/updateTeam',async(req,res)=>{
  const {count,index,userId}=req.body;
  try{
    const user = await User.findOne({ _id: userId });
    if (user && user.team) {
      user.team[index] = count;
      await user.save(); 

      console.log(user);
      res.status(200).send({ message: 'Team updated successfully' });
    } else {
      res.status(404).send({ message: 'User or team not found' });
    }

  }catch(error){
    res.send({"Error in update team":Error})
  }
})
app.post('/addproduct', async(req, res) => {
  console.log(req.files);
  const file=req.files.file?req.files.file:null;
  if(file===null){
    return res.status(500).json({error:'Error file is null'})
  }
  cloudinary.uploader.upload(file.tempFilePath, async(err, result) => {
      console.log(result);
      const lastPlayer=await Player.findOne().sort({index:-1});
      const newIndex = lastPlayer?lastPlayer.index+1:0;
      const player = new Player({
        index:newIndex,
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        basePrice: req.body.basePrice,
        credit: req.body.credits,
        recentPerformance: req.body.recentPerformance,
        image: result.secure_url,
      });
      player.save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            new_product: result,
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'Error saving player to the database.',
          });
        });
 })
  });

app.get('/listproduct',async (req,res)=>{
  try{
    const allPlayers = await Player.find();
    res.status(200).json(allPlayers);
  }catch(error){
    console.log(error);
    res.status(500).json({error:'Error in fetching players from the database.'})
  }
})
app.get('/getUser/:inputRoomId',async (req,res)=>{
  const roomId=req.params.inputRoomId;
  console.log({"getUserid":roomId});
  try{
    const allUser = await User.find({RoomId:roomId});
    res.status(200).json(allUser);
  }catch(error){
    console.log(error);
    res.status(500).json({error:'Error in fetching players from the database.'})
  }
})
app.put('/updateAmount/:inputRoomId',async(req,res)=>{
  const inputRoomId=req.params.inputRoomId;
  const currImageIndex=req.body.currImageIndex;
  const baseprice=req.body.basePrice;
  console.log({"currImageIndex":currImageIndex});
  console.log({"basePrice":baseprice});
  try{
    const user = await User.find({RoomId:inputRoomId});
    console.log({"user":user});
    for(let i=0;i<user.length;i++){
        if(user[i].team && user[i].team[currImageIndex]===true){
          user[i].amount-=baseprice;
          await user[i].save();
      }
    }
   
    console.log({"user":user});
    res.status(200).json({user});
  }catch(error){
    console.log(error);
    res.status(500).json({error:'Error in deleting the data'})
  }
})
app.delete('/deletePlayer/:id',async(req,res)=>{
  const player_id = req.params.id;
  console.log(player_id)
  try{
    await Player.deleteOne({_id:player_id})
  }catch(error){
    console.log(error);
    res.status(500).json({error:'Error in deleting the data'})
  }
})

mongoose.connect('mongodb+srv://leenagupta993:xb8bfGwsWgE2SMeh@cluster0.2asxmeo.mongodb.net/your-database-name')
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

server.listen(4000, () => {
  console.log('Server is running at 4000');
});
