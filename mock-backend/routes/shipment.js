const express = require('express');
const router = express.Router();
const db = require('../db-mock/db');
const uuidv4 = require('uuid/v4');


router.get('/list', function(req, res) {
    res.send(db.shipments);
});

router.post('/add', function(req, res) {
    const request = req.body;
    const type = getType(request.type).name;
    const auxWeight = getWeight(request.weight);
    const weight = auxWeight.name;
    const weightDesc = auxWeight.desc;
    const office = getOffice(request.office);
    const status = getStatus(request.status).name;
    const newShipment = {
        id: uuidv4(),
        type,
        status,
        weight,
        weightDesc,
        office,
    };
    addToList(newShipment);
    response(res,'Shipment added successfully');
});

router.post('/update', function(req, res) {
    const id = req.body.id;
    const updatedShipment = req.body;
    /* Setting weight description according weight category */
    updatedShipment.weightDesc = getWeight(updatedShipment.weight).desc;
    const shipment = getShipment(id);
    const updatedId = updateStatus(shipment, updatedShipment);
    response(res,updatedId + ' updated successfully');
});

router.post('/delete', function(req, res) {
    const id = req.body.id;
    const shipment = getShipment(id);
    const deletedId = deleteShipment(shipment);
    response(res,deletedId + ' deleted successfully');
});

router.post('/get', function(req, res) {
    const id = req.body.id;
    const shipment = getShipment(id);
    res.send(shipment);
});

function updateStatus(shipment, updatedShipment) {
    const pos = db.shipments.indexOf(shipment);
    db.shipments[pos] = updatedShipment;
    return shipment.id;
}

function getShipment(id) {
    const shipment = db.shipments.filter(element => element.id === id);
    if (shipment.length === 0) {
        const err = new Error('No element found');
        err.status = 404;
        throw err;
    } else {
        return shipment[0];
    }
}

function deleteShipment(shipment) {
    const pos = db.shipments.indexOf(shipment);
    db.shipments.splice(pos, 1);
    return shipment.id;
}

function getType(selection) {
    const type = db.shipmentTypes.filter(type => type.name === selection);
    if (type.length === 0) {
        const err = new Error('Wrong type');
        err.status = 500;
        throw err;
    } else {
        return type[0];
    }
}

function getWeight(selection) {
    const weight = db.weights.filter(weight => weight.name === selection);
    if (weight.length === 0) {
        const err = new Error('Wrong weight type');
        err.status = 500;
        throw err;
    } else {
        return weight[0];
    }
}

function getOffice(selection) {
    const office = db.offices.filter(office => office.id === selection.id);
    if (office.length === 0) {
        const err = new Error('Wrong office');
        err.status = 500;
        throw err;
    } else {
        return office[0];
    }
}

function getStatus(selection) {
    const status = db.shipmentStatus.filter(status => status.name === selection);
    if (status.length === 0) {
        const err = new Error('Wrong status');
        err.status = 500;
        throw err;
    } else {
        return status[0];
    }
}

function addToList(shipment) {
    db.shipments.push(shipment);
}

function response(res, message){
    res.send(JSON.stringify({message}));
}

module.exports = router;
