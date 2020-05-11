import React, { Component } from'react'
import navbar from  './static/navbar.module.css'
class Navbar extends Component{
    render(){
        return(
            <div>
                <div class={navbar.nav_bar} >
                    <a class={navbar.logo} href="home">Track It!</a>
                    <nav>
                        <ul className={navbar.nav_links}>
                            <li><a href="home"> Home</a></li>
                            <li><a href="dashboard"> Dashboard</a></li>
                            <li><a href="#"> About</a></li>
                        </ul>
                    </nav>
                    <div className={navbar.auth}>
                        <a class = {navbar.signin} href="login">Sign in</a>
                        <a class = {navbar.register} href="register">Register</a>
                    </div>
                    
                </div>
                <div className={navbar.spacer}></div>
            </div> 
            
        )
    }
    
}
export default Navbar