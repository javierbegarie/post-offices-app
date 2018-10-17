import { ShipmentType } from "./shipment-type";
import { ShipmentStatus } from "./shipment-status";
import Office from "./office";
import { ShipmentWeight } from "./shipment-weight";

class Shipment{
    
    private _type: ShipmentType = null;
    private _status: ShipmentStatus = ShipmentStatus.ORIGIN;
    private _weight: ShipmentWeight = null;

    constructor(
        private _id:string, 
        type:string, 
        status:string,
        weight:string, 
        private _weightDesc: string,
        private _office: Office
    ){
        this._type = ShipmentType[type];
        this._status = ShipmentStatus[status];
        this.weight = ShipmentWeight[weight];
    }

	public get type(): ShipmentType  {
		return this._type;
	}

	public get status(): ShipmentStatus  {
		return this._status;
	}

    public get id():string {
        return this._id;
    }

    public get office():Office{
        return this._office;
    }

    public get weight():ShipmentWeight{
        return this._weight;
    }

    public get weightDesc():string{
        return this._weightDesc;
    }

	public set type(type: ShipmentType ) {
		this._type = type;
	}

	public set status(status: ShipmentStatus ) {
		this._status = status;
    }

    public set id(id:string){
        this._id = id;
    }

    public set weight(weight:ShipmentWeight){
        this._weight = weight;
    }
    
    public set weightDesc(weightDesc:string){
        this._weightDesc = weightDesc;
    }

    public set office(office:Office){
        this._office = office;
    }
}

export default Shipment;