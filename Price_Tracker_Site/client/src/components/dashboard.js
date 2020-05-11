import React, { Component }  from 'react'
import dashboardcss from './static/dashboard.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import modalcss from './static/modal.module.css'
import { browserHistory } from 'react-router'



const BackDrop = props => (
    <div className={modalcss.backdrop}><body className={modalcss.modal_body}></body></div>
)
const Modal = props =>(
    
    <div className={modalcss.modal}>
        <header className={modalcss.title} >{props.title}</header>
        <section className={modalcss.content}>{props.children}</section>
        <section className={modalcss.actions}>
            <button class={modalcss.modal_btn} onClick={props.close}>Cancel</button>
            <button class={modalcss.modal_btn} onClick={props.submit}>Submit</button>
        </section>
        
    </div>
)

const Items = props => (
    
    <tr>
    <td>{props.count}</td>
    <td>{props.each_itemm.name_of_prod}</td>
    <td>{props.each_itemm.price_tresh}</td>
    <td>{props.each_itemm.current_price}</td>
    <td> <a href="#" onClick={() =>props.deleteitem(props.each_itemm._id) }>delete</a></td>
    </tr>
)

class dashboard extends Component
{
    state={
        showmodal:false,
        count:1,
        
        
    }
    constructor(props){
    super(props)
    this.name_of_prod = React.createRef()
    this.price_tresh = React.createRef()

    this.state={

            
            Item_data:[{
                "username": "shaun",
                "tracking_data": []
            }]
        }
}
/*
onLogout= (e) =>{
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    this.props.history.push("/");

}
*/

componentDidMount(){
    axios.get('http://localhost:5000/dashboard')
    .then(response => {this.setState({Item_data:response.data})})
    .catch(error => {console.log(error)})
     
}

deletee(id){

  axios.delete('http://localhost:5000/Dashboard/deleteitem/'+id,{ headers: { 'auth-token':localStorage.getItem('jwtToken')}})
  window.location = "/dashboard"
    

}


Itemslist = (e)=> {
    
    return this.state.Item_data.map(current_item=> {
            this.setState({count:2})
            return current_item.tracking_data.map(each_item => {
                
                return <Items each_itemm={each_item} deleteitem={this.deletee} count={this.state.count}/>})
                    
})}
additem = (e) =>{

  const data={
    
      "name_of_prod": this.name_of_prod.current.value,
      "price_tresh" : this.price_tresh.current.value
      
  }
  return axios.patch('http://localhost:5000/Dashboard/additem',data,{ headers: { 'auth-token':localStorage.getItem('jwtToken')}})
  .then(window.location = "/dashboard")
  
}
startAddItemHandler = () =>{
    this.setState({showmodal:true})
}
stopAddItemHandler = () =>{
    this.setState({showmodal:false})
}

render(){
    return (
    <div class="dashboard">
        
        
        <table class={dashboardcss.table}border="1">
        <tr>
        <th>Sr. No</th>
        <th>Product Name</th>
        <th>Price Threshold</th>
        <th>Current Price</th>
        <th></th>
        </tr>
        
        {this.Itemslist()}
        </table>
        
        <button class={dashboardcss.add_btn} onClick={this.startAddItemHandler}>Add Item</button>
        {this.state.showmodal && <BackDrop/>}
        {this.state.showmodal && 
        <Modal title={'Add Item'} close={this.stopAddItemHandler} submit={this.additem} >
            
            <form>        
                <input class="input" type="text" ref={this.name_of_prod} placeholder={'Name of Product'}/>
                <br/>
                <input type="text" ref={this.price_tresh} placeholder={'Price Treshold'}/>
                <br/>

             </form>
             
        </Modal>}
        
    </div>)
}
}

export default dashboard
