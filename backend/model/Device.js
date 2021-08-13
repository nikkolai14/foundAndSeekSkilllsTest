const mongoose = require('mongoose');
const AvailabilityTypes = require('./types/AvailabilityTypes');

const DeviceSchema = new mongoose.Schema({
    deviceId:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true 
    },
    field:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:[{
        type: String,
        required: true
    }],
    availability:{
        type: String,
        enum: AvailabilityTypes,
        required: true
    }
});

module.exports = Device = mongoose.model('device', DeviceSchema);