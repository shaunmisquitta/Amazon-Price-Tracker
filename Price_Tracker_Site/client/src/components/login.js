import React from'react'
import { Component } from 'react'
import axios from 'axios'
import logincss from './static/login.module.css'
class login extends Component
{
    
    constructor(props)
    {
        super(props)
        this.state = {
            username:'',
            password:'',
            emptyfield:false,
            data:[]
        }

    }
    
    onChangeUsername = (e) => 
    {
        this.setState({username:e.target.value})

    }

    onChangePassword = (e) => 
    {
        this.setState({password:e.target.value})
        console.log(this.props.data)

    }
    onSubmit=(e) => 
    {
        e.preventDefault()

        if (!this.state.username || !this.state.password)
        {
            this.setState({emptyfield:true})
        }
        
        const data = {
            username: this.state.username,
            password:this.state.password
        }

        return axios.post('http://localhost:5000/users/login', data)
            .then(res=>{
                const token = res.data.token
                localStorage.setItem('jwtToken',token)
                
                this.props.history.push("/");
                
            })
            .catch(err => console.log(err))
        
            
           
    }  
    
    render()

    {  
        return(
            
            <div class={logincss.login_page}>
                <div class= {logincss.login_cointainer}>
                    <div class={logincss.login_heading}>
                        <p>Log in</p>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        
                        <input class="input" type="text" value={this.state.username} onChange={this.onChangeUsername} placeholder={'Username'}/>
                        <br/>
                        <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder={'Password'}/>
                        <br/>›
                        <input class={logincss.submit} type='submit' value='Submit' />
                    </form>
                    { this.state.emptyfield ? (<h2>{this.props.data}ddd</h2>):null }
                    <div class={logincss.sign_up_text}>
                    <p >Don't have an account? <a href="register"> Sign up</a></p>
                    </div>
                </div>
            </div>
                )
  
    }
    
}
export default login