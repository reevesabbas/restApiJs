const express = require('express')
const router = express.Router();
//Pulling model created.
const TierList = require('../models/tierLists')

//Getting all tier lists
router.get('/', async (req, res) => {
    try {
        //Get all diff tier lists, Asynch method.
        const tierLists = await TierList.find();
        res.json(tierLists)
    } catch (err) {
        //Send err to user as JSON, bc json API.
        //Status set to 500 so user knows err w/ server.
        res.status(500).json({message: err.message})
    }
})

//Getting one tier list
router.get('/:id', getTierList, (req, res) => {
    res.json(res.tierList)
})


//Creating a tier list, async bc saving models is an async operation
router.post('/', async (req, res) => {
    const tierList = new TierList({
        //Coming from the req, body is what the user sends (json).
        albumName: req.body.albumName,
        tier: req.body.tier,
        reason: req.body.reason,
    })
    try {
        //.save returns a promise. On save, resolves to the saved data.
        //storing that saved data into this varfor the sake of logging
        const newTierList = await tierList.save();
        //status 201, successfully created an object.
        //If no status, it sends status 200 which means everything went well
        res.status(201).json(newTierList)
    } catch(err) {
        //400, bc if user gives bad data, this fails. Nothing wrong w server
        res.status(400).json({message: err.message});
    }
})


//updating a tier list
router.patch('/:id', getTierList, async (req, res) => {
//Only updates data that is given in the request's body.
    if (req.body.albumName != null) {
        res.tierList.albumName = req.body.albumName;
    }
    if (req.body.tier != null) {
        res.tierList.tier = req.body.tier;
    }
    if (req.body.reason != null) {
        res.tierList.reason = req.body.reason;
    }

    try {
        //returns a promise, resolves to the data that was saved.
        const updatedTierList = await res.tierList.save()
        res.json(updatedTierList)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})


//deleting a tier list
//async bc we use try/catch
router.delete('/:id', getTierList, async (req, res) => {
    try {
        await res.tierList.remove()
        res.json({message: `Deleted tier list`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Other 3 methods all need an ID. So, we make a function to do that so it takes up less code.
//next, is how we move onto the request method's callback functions.
//async bc database is being accessed inside code.
async function getTierList(req, res, next) {
    //
    let tierListId
    try {
        //using mongoose's findById to look for the a matching ID in the db.
        tierListId = await TierList.findById(req.params.id)
        //If this does not exist, err 404
        if (tierListId == null) {
            //404 means could not find something
            //Returning, because if ID not found- we want to exit the function
            return res.status(404).json({message: 'Cannot find album name'})
        }
        //In the case the Id is not found, but is not null, catch the error and return it thru json.
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    //Setting a response variable = to the tier List we found by Id.
    res.tierList = tierListId
    //callback function to continue methods.
    next()
}

module.exports = router;