class Office{
    constructor(
        private _id:string,
        private _name:string,
        private _PLZ: number)
    {

    }

    get id():string{
        return this._id;
    }

    set id(id:string){
        this.id = id;
    }

    get name():string{
        return this._name;
    }

    set name(name:string){
        this._name = name;
    }

    get PLZ():number{
        return this._PLZ
    }

    set PLZ(PLZ:number){
        this._PLZ = PLZ;
    }
}

export default Office;