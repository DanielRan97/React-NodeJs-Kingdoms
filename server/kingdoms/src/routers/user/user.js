const express = require('express');
const User = require('../../models/user');
const router = new express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

const fixeLetters = l => {
    const newLetters = [];

    for (let i = 0; i < l.length; i++) {
        if(i === 0){
            let upperCase = l[i].toUpperCase();
            newLetters.push(upperCase);
        } else {
            let lowerCase = l[i].toLowerCase();
            newLetters.push(lowerCase)
        }
     };
     let newWord = newLetters.join('');
     return newWord;
};

const checkIfUserExists = async userData => {
    
    let data = userData;
    if(typeof userData.nickName === 'object'){
 
        for (let key in data) {
            
            const checkNickName = await User.findOne({nickName: data.nickName.value});
            const checkEmail = await User.findOne({email: data.email.value});
            const checkKingdomName = await User.findOne({kingdomName: fixeLetters(data.kingdomName.value)});
            let exists = {
                    nickName: checkNickName !== null ? true : false,
                    email: checkEmail !== null ? true : false,
                    kingdomName: checkKingdomName !== null ? true : false
                };
                return exists;
        };

    } else {
 
        const checkNickName = await User.findOne({nickName: data.nickName});
            const checkEmail = await User.findOne({email: data.email});
            const checkKingdomName = await User.findOne({kingdomName: fixeLetters(data.kingdomName)});
            let exists = {
                    nickName: checkNickName !== null ? true : false,
                    email: checkEmail !== null ? true : false,
                    kingdomName: checkKingdomName !== null ? true : false
        }; 
        return exists;
    };
};

router.post("/users/sign-up/checkIfUserExists", async (req,res) => {
    try{
        let userData = req.body;
        let exists = await checkIfUserExists(userData);
        res.status(200).send({ exists });
    } catch (error){
        res.status(500).send(error);
    }
});

router.post("/users/sign-up", async (req,res) => {
    const user = new User(req.body);
    let exists = checkIfUserExists(user);
    if(exists) {
        try{
            user.name = fixeLetters(user.name);
            user.lastName = fixeLetters(user.lastName);
            user.kingdomName = fixeLetters(user.kingdomName);
            await user.save();
            const token = await user.generateAuthToken();
           res.status(201).send({ user, token });
        }catch(e){
           res.status(400).send(e);
        };
    };
});

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }catch(e){
        res.status(400).send("Login failed");
    }
})

router.post('/users/logout', auth , async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        res.send("Logut worked");
    }catch(e){
        res.status(500).send('Logout falied');
    }
})

router.post('/users/logoutAll', auth , async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send("LogoutAll worked");
    }catch(e){
        res.status(500).send('LogoutAll falied');
    }
})  

router.get("/users/me", auth , async (req,res) => {
    res.send(req.user);
})

router.patch('/users/me', auth ,async (req, res) => {
   const updates = Object.keys(req.body);
   const allowedUpdate = ['name', 'email', 'password', 'age'];
   const isValidOperation = updates.every((update) => allowedUpdate.includes(update));

   if(!isValidOperation){
       return res.status(400).send({error : "Invalid update!"})
   }

   try{
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
       res.send(req.user);
   } catch (e) {
       res.status(400).send("Update user failed");
   }
})

router.delete('/users/me', auth ,async (req,res) => {
   try{
    await req.user.remove();
    res.send(req.user);
   }catch(e){
       res.status(500).send(e);
   }
})

const uploadAvatarImage = multer({
    limits: {
        fileSize: 1000000 //1 Mega byte
    },
    fileFilter(req, file, cb){
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error('Upload falied,Please upload a jpg,jpeg or png'));
       }

       cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, uploadAvatarImage.single('avatarImage'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save();
    res.send("Avatar image upload successfully");

},(error, req, res, next) => {
    res.status(400).send({error: error.message});
});

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send('Avatar image deleted successfully');
});

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type','image/png');
        res.send(user.avatar);
    }catch(e){
        res.status(404).send('No image found');
    }
})

module.exports = router;
