const express = require("express");
//1:create a new router
const router = new express.Router();
const Student = require("../models/students");
 




// 2:define the router


// router.get("/",(req,res)=>{
//     res.send("Hyy I am rootpath ");
// })
//creating a new student
// router.get("/students", (req, res) => {
//   //getting new data
//   res.send("hello ");
// });




// router.post("/students",(req,res)=>{

//      //getting new data
//       console.log(req.body);
//      const user = new Student(req.body);

//      //for save data in mongodb and we are using promises .then because saving database may take time
//      user.save().then(()=>{
//         res.status(201).send(user);
//      }).catch((e)=>{
//         res.status(400).send(e);
//      })

//     //res.send("hello from post ");
// })





//using async await
router.post("/students", async (req, res) => {
    try {
      //getting new data
      const user = new Student(req.body);
  
      //for save data in mongodb and we are using promises .then because saving database may take time
      //HERE WE ARE WATING UNTIL WE DONT SAVE OUR DATA
      const createUser = await user.save();
      res.status(201).send(createUser);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  
  //reading data of registered Student
  router.get("/students",async(req,res) => {
      try {
         const readUser=await Student.find();
         res.send(readUser);
      } catch (error) {
          res.status(400).send(error);
      }
  })
  
  
  
  //reading the individualstudent data using id
  router.get("/students/:id", async (req,res)=>{
       try {
          const _id = req.params.id;
          const byId = await Student.findById(_id);
  
          if (!byId) {
              res.status(404).send();
  
          }else{
  
              res.send(byId);
          }
          
  
          //when we click on send on post then it will display on console
          //console.log(_id);
          
          //for postman
          // res.send(_id);
       } catch (error) {
          res.status(400).send(error);
       }
  })
  
  //reading the individualstudent data using name
  router.get("/students/name", async (req,res)=>{
       try {
          const _name = req.params.name;
          const byname = await Student.find({name:_name});
  
          if (!byname) {
              res.status(404).send();
  
          }else{
              //console.log(byname);
              res.send(byname);
          }
          
       } catch (error) {
          res.status(500).send(error);
       }
  })
  
  //update student by their ID
  router.patch("/students/:id",async(req,res)=>{
     try {
      const _id = req.params.id;
      //req.body is for we write change in body to get that change we use req.body
      const updateStudent=await Student.findByIdAndUpdate(_id,req.body,{
          //this is for when we update we will see new updated data on postman
          new:true
      });
       res.send(updateStudent);
     } catch (e) {
      res.status(404).send(e);
     }
  })
  
  //delete student
  //working 
  router.delete("/students/:name",async(req,res)=>{
  
      const val=req.params.name;
  
      const findByNameAndDelete=await Student.deleteOne({name:val})
  
      // res.send(findByNameAndDelete);
      res.send(findByNameAndDelete);
  
  })
  

  module.exports = router