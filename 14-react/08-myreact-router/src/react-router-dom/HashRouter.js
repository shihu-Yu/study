import React ,{ Component } from 'react'
import {Provider} from './context'
 
class HashRouter extends Component{
    constructor(props){
        super(props)
        this.state = {
            location:{
                pathname:window.location.hash.slice(1) || '/'
            }
        }
    }
    componentDidMount(){
        //设置默认的hash
        window.location.hash =  window.location.hash || '/'  
        // 监听hash的变化
        window.onhashchange = ()=>{
            this.setState({
                location:{
                    pathname:window.location.hash.slice(1)
                }
            })
        }
    }

    render(){
        const value = {
            location:this.state.location,
            history:{
                push(to){
                    window.location.hash = to
                }
            }
        }
        return(<Provider value={value} >{this.props.children}</Provider>)
        
    }
}

export default HashRouter
