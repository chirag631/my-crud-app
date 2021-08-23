const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const path = require('path');

router.post('/register', async(req, res) => {
    const user = new User(req.body);
    console.log(user);
    try {
        await user.save()
        // const token=await user.generateToken()
        res.status(201).send(user)
    }
    catch (e) {

        if (e.name === 'MongoError') {
            return res.status(400).send({ error:"Email is already in database",type:"email"})
        }
        res.status(400).send(e)
    }
   
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user ) {
            throw new Error()
        }
        const ismatch = await bcrypt.compare(req.body.password, user.password)
        if (!ismatch ) {
            throw new Error()
        }
        const token = await user.generateToken();
        res.status(200).send({user,token});
    } catch (error) {
        
        res.status(400).send({error:"Invalid Username or Password!"});
    }
    
})

router.get('/getUsers/me',auth, async(req, res) => {
    
    try {  
        // console.log(req.user)
        // const user=await User.findOne({email:req.params.email})
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send({error:"failed to find users"});
    }
    
})

router.get('/getdata/:email',async(req,res)=>{
    try{
        console.log(req.params.email)
        const user=await User.findOne({email:req.params.email});
    if(!user){
        throw new Error("User Not Found!!!");
    }
    console.log(user)

     res.status(200).send(user);
    }catch(e){
        console.log(e)
        res.status(400).send({error:e});
    }
    
})

router.get('/admingetdata',async(req, res) => {
    
    try {  
        // console.log(req.user)
        const user=await User.find({})
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({error:"failed to find users"});
    }
    
})


router.patch('/updateUser/me',auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'age', 'email', 'password'];
    const isValidateField = updates.every((update) => {
        return allowUpdates.includes(update);
    })
    console.log(isValidateField);
    if (!isValidateField) {
        return res.status(400).send("Please update valid field!");
    }
    try {
        
        updates.forEach((update)=> req.user[update]=req.body[update])
        
        await req.user.save();

        res.status(200).send(req.user);
    } catch (error) {
        console.log(error)
        res.status(400).send({error:"Failed to update information"});
    }
})

router.patch('/updateEmployee/:email', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'age', 'email', 'password'];
    const isValidateField = updates.every((update) => {
        return allowUpdates.includes(update);
    })
    console.log(isValidateField);
    if (!isValidateField) {
        return res.status(400).send("Please update valid field!");
    }
    try {
        const user=await User.findOne({email:req.params.email});
        if(!user){
            throw new Error("User not found");
        }
        updates.forEach((update)=> user[update]=req.body[update])
        
        await user.save();

        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.status(400).send({error:"Failed to update information"});
    }
})

router.post('/logout/me', auth, async(req, res) => {
    try {
        req.user.tokens = await req.user.tokens.filter((tokens) => {
            return tokens.token !== req.token
         })
        await req.user.save()
        res.status(201).send(req.user);
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

router.delete('/deleteUser/me',auth, async(req, res) => {
    
    try {
        if (!req.user) {
            return res.status(404).send();
          }
        await req.user.remove();
        
        
         res.status(200).send(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Failed to update information"});
    }
})



router.delete('/deletebyadmin/:email',async(req,res)=>{
    try{
        console.log(req.params.email)
        const user=await User.findOne({email:req.params.email});
    if(!user){
        throw new Error("User Not Found!!!");
    }
    console.log(user)
    
    await user.remove();
     res.status(200).send(user);
    }catch(e){
        console.log(e)
        res.status(400).send({error:e});
    }
    
})


module.exports = router;