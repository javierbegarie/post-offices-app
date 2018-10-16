const uuidv4 = require('uuid/v4');
const offices = require('./offices');

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

const shipmentCreator = (type,status,weight,office)=>({
    id: uuidv4(),
    type: type.name,
    status: status.name,
    weight: weight.desc,
    weightCategory: weight.name,
    office: office
});

const randomFactory = (array) => () => { 
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

const getShipmentType = randomFactory(shipmentTypes);
const getShipmentStatus = randomFactory(shipmentStatus);
const getOffice = randomFactory(offices);
const getShipmentWeight = randomFactory(weights);

let shipmentsCuantity = 120;

const shipments = [];
let auxType = '';
let auxWeight = null;
for(let i=0;i<shipmentsCuantity;i++){
    auxType = getShipmentType();
    auxWeight = auxType.name === 'letter'? weights[0] : getShipmentWeight();
    shipments.push( 
        shipmentCreator(
            auxType,
            getShipmentStatus(),
            auxWeight,
            getOffice()
        ) 
    )
}

module.exports = {
    shipmentTypes,
    shipmentStatus,
    weights,
    shipments,
    offices,
};
