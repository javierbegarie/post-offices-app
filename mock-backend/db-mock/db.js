const uuidv4 = require('uuid/v4');

const shipmentTypes = [
    {id: 0, name: 'letter'},
    {id: 1, name: 'package'}
];

const shipmentStatus = [
    {id: 0, name: 'origin', desc: 'Received and processed in the parcel center of origin'},
    {id: 1, name: 'destination', desc: 'Received and processed in the destination parcel center'},
    {id: 2, name: 'delivered', desc: 'Delivered'}
]

const weights = [
    {id: 0, name:'light', desc: 'Less than 1kg'},
    {id: 1, name:'medium', desc: 'Between 1kg and 5kg'},
    {id: 2, name:'heavy',desc: 'More than 5kg'}
];

const offices = [
    {
        id: uuidv4(),
        PLZ: 80686,
        name: 'Laim',
    },
    {
        id: uuidv4(),
        PLZ: 80335,
        name: 'Schwanthalerhöhe',
    },
];


const shipments = [
    {
        id: uuidv4(),
        type: shipmentTypes[1].name,
        status: shipmentStatus[0].name,
        weight: weights[2].desc,
        office: offices[0]
    },
    {
        id: uuidv4(),
        type: shipmentTypes[0].name,
        status: shipmentStatus[1].name,
        weight: weights[0].desc,
        office: offices[1]
    },
];

module.exports = {
    shipmentTypes,
    shipmentStatus,
    weights,
    shipments,
    offices,
};
