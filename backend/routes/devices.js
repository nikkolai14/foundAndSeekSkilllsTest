const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator');
const Device = require('../model/Device');
const AvailabilityTypes = require('../model/types/AvailabilityTypes');

//@route    POST /devices
//@desc     Create Device
//@Access   Public
router.post('/', [
    check('deviceId','Device ID is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
    check('field','Field is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('availability','Availability is required').not().isEmpty(),
    check('availability','This Availability is not valid').isIn(AvailabilityTypes)
],
async (req,res) => {                                                            
    const errors = validationResult(req);
    if(!errors.isEmpty()) {                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }

    const {deviceId, name, field, description, availability} = req.body;                                         
    try {    
        let device = await Device.findOne({deviceId});
        if(device) {
           return res.send('Device Already Exists');
        }

        device = new Device({
            deviceId,
            name,
            field,
            description,
            availability
        });

        await device.save(); 
        res.send('Device saved successfully');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /devices
//@desc     Get All Devices
//@Access   Public
router.get('/', (req, res) => {
    Device.find()
        .then(device => res.json(device))
        .catch(err => res.status(404).json({ no_devices_found: 'No devices found' }));
});

//@route    GET /devices/:id
//@desc     Get specific Device by id
//@Access   Public
router.get('/:id', (req, res) => {
    Device.findById(req.params.id)
        .then(device => res.json(device))
        .catch(err => res.status(404).json({ no_device_found: 'No device found' }));
});

//@route    PUT /devices/:id
//@desc     Update specific Device by id
//@Access   Public
router.put('/:id', [
    check('deviceId','Device ID is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
    check('field','Field is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('availability','Availability is required').not().isEmpty(),
    check('availability','This Availability is not valid').isIn(AvailabilityTypes)
],
async (req,res) => {                                                            
    const errors = validationResult(req);
    if(!errors.isEmpty()) {                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }

    Device.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.send('Device updated successfully'))
        .catch(err => res.status(500).send('Server Error'));
});

//@route    DELETE /devices/:id
//@desc     Delete specific Device by id
//@Access   Public
router.delete('/:id', (req, res) => {
    Device.findByIdAndRemove(req.params.id, req.body)
        .then(device => res.json({ mgs: 'Device deleted successfully' }))
        .catch(err => res.status(404).json({ no_device_found: 'No device found' }));
});

module.exports = router;