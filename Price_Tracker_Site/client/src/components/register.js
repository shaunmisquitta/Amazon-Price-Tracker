import React, { Component }  from'react'
import axios from 'axios'
import registercss from './static/register.module.css'

class register extends Component{

    constructor(props){
        super(props)
        this.state= {
            username:'',
            password:'',
            email:'',
            emptyfield:false,
        }
    }
    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }
    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    }
    onChangeemail = (e) => {
        this.setState({email: e.target.value})
    }
    onSubmit = (e) =>{
        e.preventDefault();

        
        if (!this.state.username || !this.state.password || !this.state.email)
        {
            this.setState({emptyfield:true})
        }
        else
        {

            const data = {
                username: this.state.username,
                email:this.state.email,
                password:this.state.password
            }
            axios.post('http://localhost:5000/users/register', data)
            .then((res)=>{console.log(res.data)})
            
            
        }
    }

    
    render(){
        return(
            <div class={registercss.register_page}>
                <div class= {registercss.register_cointainer}>
                    <div class={registercss.register_heading}>
                        <p>Register</p>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        
                        <input type='text' value={this.state.username} onChange={this.onChangeUsername} placeholder={'Username'}></input>
                        <br/>
                        <input type='text' value={this.state.password} onChange = {this.onChangePassword} placeholder={'Password'}></input>
                        <br/>
                        <input type='text' value={this.state.email} onChange = {this.onChangeemail} placeholder={'Email'}></input>
                        <br/>
                        <input type ='submit' class={registercss.submit} ></input>
                        { this.state.emptyfield ? (<h2>Eorrrr</h2>):null }
                    
                    </form>
                </div>
            </div>

        )
    }
    
}
export default register