import { OfficeService } from "src/app/services/office.service";
import { of } from "rxjs";
import Office from "src/app/model/office";

export const OfficeServiceStub: Partial<OfficeService> = { 
    getOffices: ()=>of([]),
    getOffice: (id)=>of([{id}]),
    updateOffice: (office:Office)=>of([office]),
    postOffice: (PLZ,name)=>of([{PLZ,name,id:'fakeId'}])
};

