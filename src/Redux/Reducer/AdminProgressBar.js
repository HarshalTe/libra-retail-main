const initialState = 0
const AdminProgressBar = (state = 0, action)=>{
    console.log(3322,action)
    switch (action.type){
        case "ADD_ONE" : return state = (state+1)
        default: return state
    }
}

export default AdminProgressBar