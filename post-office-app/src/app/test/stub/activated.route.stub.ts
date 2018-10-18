
export const ActivatedRouteStubModifier = {
    snapshotParam: 'mockParam'
};

export const ActivatedRouteStub = {
    snapshot:{
        paramMap:{
            get: function(param:string) {
              return ActivatedRouteStubModifier.snapshotParam;
            } 
        }
    }
};