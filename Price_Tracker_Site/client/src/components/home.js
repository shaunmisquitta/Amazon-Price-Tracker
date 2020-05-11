import React, { Component } from'react'
import homecss from './static/home.module.css'
class home extends Component{
    render(){
        
        
        return(
            <div class={homecss.home}>
                 
                <div class={homecss.heading_text}>
                    <h1>Want to track all those prices in you're Shopping Cart?</h1>
                </div>
                
                <div class={homecss.heading_text_tag_line}>
                    <p> We've got you covered.</p>
                </div>
                <div class={homecss.register_btn}>
                    <a class={homecss.register} href="#">Register</a>
                </div>
                <p class={homecss.member}>Already have an account?<a href="#"> Sign in</a></p>
                
            </div>
        )
    }  
}
export default home