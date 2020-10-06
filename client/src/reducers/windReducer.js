const initialState = {
    windData: ['11.3','10.1','14.4']
   };
   
   const swellReducer = (state = initialState, action) => {
     switch (action.type) {
       case "UPDATE_WIND_DATA":
         return { ...state, windData: action.wind };
       default:
         return state;
     }
   };
   
   export default swellReducer;
   