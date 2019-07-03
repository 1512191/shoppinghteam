module.exports.findIndex = (array, element) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].product.ID === element.ID) {
            return i;
        }
    }
    return -1;
}
module.exports.countQuantity = (array)=>{
    let count = 0;
    for(let i =0; i<array.length; i++){
        count+=array[i].Quantity;
    }
    
    return count;
}

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

module.exports.showVNDCurrency = (price) => {
      return formatter.format(price);
}
module.exports.classNameStatus = (status)=>{
    if(status === 'Recieved'){
        return 'fas fa-check-circle';
    }else if(status === 'OnDelivering'){
        return 'fas fa-truck billInfor'
    }else if(status === 'Failed'){
        return 'fas fa-times-circle'
    }else{
        return 'fas fa-spinner'
    }
}
module.exports.colorStatus = (status)=>{
    if(status === 'Recieved'){
        return '#155724';
    }else if(status === 'OnDelivering'){
        return '#856404'
    }else if(status === 'Failed'){
        return '#721c24'
    }else{
        return '#9900FF'
    }
}
module.exports.statusName = (status)=>{
    if(status === 'Recieved'){
        return 'Đơn hàng giao thành công';
    }else if(status === 'OnDelivering'){
        return 'Đơn hàng đang giao'
    }else if(status === 'Failed'){
        return 'Đơn hàng đã hủy'
    }else{
        return 'Đơn hàng đang xử lí'
    }
}