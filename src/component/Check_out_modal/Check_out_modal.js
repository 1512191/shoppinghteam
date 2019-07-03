// import React, { Component } from 'react';
// import './checkout.css'
// import {toggleModal} from '../../action/modal';
// import {connect} from 'react-redux';
// import util from '../../Util';



// class Check_out extends Component {
//   constructor(props) {
//     super(props);
    
//   }
//   close = ()=>{
//     this.props.toggleModal();
//   }
//     render() {
//         return (
           
// <div style={{display:this.props.displayParent?'block':'none'}}className="modal" id="checkout">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
       
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.close()}>
//           <span aria-hidden="true">×</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <div className='item'>
//             <ul className='row item1'>
//                 <li className='col-6'>
//                     <a href="file:///C:/Users/dtthue/Desktop/web/index.html">
//                     Samsung Galaxy J7
//                     </a>
//                 </li>
//                 <li className='col-2'>
//                     <input className='quantity' type='number' defaultValue='1'></input>
//                 </li>
//                 <li className='col-2'>
//                 <span className="glyphicon glyphicon-remove"></span>
//                 </li>
//                 <li className='col-2'>
//                     129
//                 </li>
//             </ul>
//             <br></br>
//             <ul className='row item1'>
//                 <li className='col-6'>
//                     <a href="file:///C:/Users/dtthue/Desktop/web/index.html">
//                     Samsung Galaxy J7
//                     </a>
//                 </li>
//                 <li className='col-2'>
//                     <input className='quantity' type='number' defaultValue='1'></input>
//                 </li>
//                 <li className='col-2'>
//                 <span className="glyphicon glyphicon-remove"></span>
//                 </li>
//                 <li className='col-2'>
//                     129
//                 </li>
//             </ul>
//         </div>
        
//       </div>
//       <div className=" row modal-footer">
        
//         <div className='col-6 total'>
//                     Total: <span>2727</span>
//                 </div>
//                 <div className='col-6'>
//                     <button type="button" className="btn btnCheckout mb1 bg-blue" data-dismiss="modal">Check out</button>
//                 </div>
       
                
       
//       </div>
//     </div>
//   </div>
// </div>



          
//         );
//     }
// }
// const mapStateToProps = (state)=>{
//   return {
//     display: state. modalReducer,
//   }
// }
// const mapDispathtoProps = (dispath)=>{
//     return {
//       toggleModal:()=>dispath(toggleModal),
//     }
// }
// export default connect(mapStateToProps, mapDispathtoProps)(Check_out);