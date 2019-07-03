import * as types from '../actions/constant';

let address = {
  districts: [],
  selectedDistrict: null,
  selectedTown: null
};

export default (state = address, action) => {
  switch (action.type) {
        
  case types.GET_ADDRESS:
    return {
      districts: action.districts,
      selectedDistrict: action.selectedDistrict,
      selectedTown: action.selectedTown
  };

  default:
    return state
  }
}
