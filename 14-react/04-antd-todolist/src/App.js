
import React ,{ Component } from 'react'
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime"
// import Item from './Item'
import {  DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col ,Input,List ,Button} from 'antd';
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:[],
            task:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(ev){
        this.setState({
            task:ev.target.value
        })
    }
    handleSubmit(){
        const list = [...this.state.list]
        list.push({
            id:Date.now(),
            task:this.state.task
        })
        this.setState({
            list,
            task:''
        })
    }
    handleDel(id){
        const list = this.state.list.filter(item=>item.id != id)
        this.setState({
            list
        })
    }
    async componentDidMount(){
       const result = await axios.get('http://127.0.0.1:3000')
       this.setState({
           list:result.data
       })
    }
    render(){
    // const items = this.state.list.map(item=><li key={item.id} onClick={this.handleDel.bind(this,item.id)} className="item">{item.task}</li>)
    
        return(   
            <div className="App">
                <Row>
                    <Col span={18}><Input onChange={this.handleChange} value={this.state.task} /></Col>
                    <Col span={6}><Button type="primary" onClick={this.handleSubmit}>提交</Button></Col>
                </Row>
                <List 
                    style={{marginTop:'30px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item=>(
                        <List.Item onClick={this.handleDel.bind(this,item.id)}>
                            {item.task}
                        </List.Item>
                    )}
                />
               
            
            </div>
        )
    }
}

export default App