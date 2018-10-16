import { ShipmentType } from "./shipment-type";
import { ShipmentStatus } from "./shipment-status";
import Office from "./office";

class Shipment{
    
    private _type: ShipmentType = null;
    private _status: ShipmentStatus = ShipmentStatus.ORIGIN;

    constructor(private _id:string, type:string, status:string,private _weight:any, private _office:Office){
        this._type = ShipmentType[type];
        this._status = ShipmentStatus[status];
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

    public get weight():any{
        return this._weight;
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

    public set weight(weight:any){
        this._weight = weight;
    }
    
    public set office(office:Office){
        this._office = office;
    }
}

export default Shipment;