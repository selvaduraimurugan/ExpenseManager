const router = require('express').Router();
const User = require('./userSchema');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) => {
    console.log(req.body);
    try{
        var emailExist = await User.findOne({email:req.body.email});
        if(emailExist){
            return res.status(400).json("Email already exist");
        }

        //Password Hash
        var hash = await bcrypt.hash(req.body.password,10);
        
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hash
        });

        var data = await user.save();
        res.json(data);
    }catch(err){
        
    }
    res.json((req.body));
});

module.exports = router;