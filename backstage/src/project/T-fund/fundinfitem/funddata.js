import React, { Component } from 'react';


export default class Funddata extends Component{


    
    render(){
        
        return(
            <div style={{background:"#F0F2F5",color:"#000"}}>
                <div style={{background:"#fff",padding:"20px 32px"}}>
                    <h3 style={{fontSize:"16px",fontWeight:"500",marginBottom:"10px"}}>累计募集详情</h3>
                    <div style={{width:"150%",height:"0px",borderBottom:"1px solid #E9E9E9",marginLeft:"-50px"}}></div>
                    <div style={{marginTop:"20px"}}>
                        <div style={{marginRight:"120px",display:"inline-block"}}>
                            计划募资：3000 USDT
                        </div>
                        <div style={{marginRight:"120px",display:"inline-block"}}>
                        实际募资：2500 USDT
                        </div>
                        <div style={{marginRight:"120px",display:"inline-block"}}>
                        起止时间：2018.03.15 ——2018.06.15
                        </div>
                        <div style={{display:"inline-block"}}>
                        完成率：83%
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
