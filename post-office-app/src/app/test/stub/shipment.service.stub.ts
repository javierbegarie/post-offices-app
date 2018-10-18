import { ShipmentService } from "src/app/services/shipment.service";
import { of } from "rxjs";
import Shipment from "src/app/model/shipment";

export const ShipmentServiceStub: Partial<ShipmentService> = {
    getShipment:()=>of([]),
    postShipment: (type,status,weight,office)=>of([{type,status,weight,office}]),
    updateShipment: (shipment:Shipment)=>of([shipment])
};