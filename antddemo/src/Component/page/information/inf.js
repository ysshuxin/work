import React, { Component } from "react";
import Nav from "../../Nav";
import Foot from "../../Foot";
import img from "../../../img/logo.png";
import { Icon, Popover, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "../../../api/api";
import QRCode from "qrcode";

let InfDom = props => {
  return (
    <div
      style={{
        display: "inline-block",
        width: "24.5%",
        margin: "0 3%",
        textAlign: "left",
        marginBottom: "50px"
      }}
    >
      <div
        style={{
          width: "100%",
          paddingBottom: "56.25%",
          overflow: "hidden",
          background: "#000",
          position: "relative"
        }}
      >
        <Link to="/inf">
          <img
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              right: "0",
              top: "0",
              margin: "auto",
              width: "100%",
              height: "100%"
            }}
            src={img}
            tag=""
          />
        </Link>
      </div>
      <h3 style={{ fontSize: "16px", margin: "16px 0" }}>
        这里输入标题这里输入标题这里输入标题这里输入
      </h3>
      <div style={{ fontSize: "14px" }}>
        这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里输入内容这里
      </div>
      <div style={{ marginTop: "10px" }}>2018/08/10</div>
    </div>
  );
};

export default class Inf extends Component {
  state = {
    wechatShow: true
  };

  componentDidMount = () => {
    console.log(this.props.location);
  };
  weChat = e => {
    setTimeout(() => {
      var canvas = document.getElementById("canvas");

      QRCode.toCanvas(canvas, window.location.href);
    }, 100);
  };
  render() {
    const content = (
      <div style={{ padding: "10px", width: "200px", height: "200px" }}>
        <p style={{ fontSize: "12px", textAlign: "center" }}>分享到微信</p>
        <div
          style={{
            width: "160px",
            height: "160px",
            textAlign: "center",
            margin: "0 auto"
          }}
        >
          <canvas
            style={{ width: "160px", height: "160px", margin: "0 auto" }}
            id="canvas"
          />
        </div>
      </div>
    );

    return (
      <div>
        <Nav />
        <div style={{ marginTop: "65px" }}>
          <div 
            style={{
              position: "relative",
              backgroundImage:
                "url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4086828269,3721035610&fm=26&gp=0.jpg')",
              backgroundSize: "100%",
             
            }}
          >
            <div
              style={{
                width: "100%",
                height: "500px",
                background: "#28282A",
                textAlign: "center",
                overflow: "hidden",
                backgroundImage:
                  "url('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4086828269,3721035610&fm=26&gp=0.jpg')",
                backgroundSize: "100%",
               " -webkit-filter":"blur(10px)  brightness(80%)",
             
                filter: "blur(8px) "
              }}
            />
            <h1
              style={{
                color: "#fff",
                fontSize: "50px",
                width: "840px",
                margin: "340px auto",
                textAlign: "left",
                position: "absolute",
                top: "0",
                left: "20%",
                zIndex: "10"
              }}
            >
              科银资本区块链投资哲学与理念 ——专访董事长程剑波先生
            </h1>
          </div>

          <div style={{ background: "#e8e8e8" }}>
            <div
              style={{
                padding: "44px 80px",
                width: "75%",
                minWidth: "1200px",
                margin: "0 auto",
                background: "#fff"
              }}
            >
              <h5 style={{ color: "#4A4A4A", fontSize: "12px" }}>
                时间：2018/08/09
              </h5>
              <h5 style={{ color: "#4A4A4A", fontSize: "12px" }}>
                来源：科银资本
              </h5>
              <div style={{ lineHeight: "2em" }}>
                数字货币市场的连续阴跌让整个市场都郁郁寡欢，市价瀑布后，是整个行业的大规模恐惧，信仰破灭的叫嚣愈演愈烈。
                那3年前呢？3年前，比特币大跌，比特币算力大降，大量的人抛售了手中的比特币，
                放弃了比特币信仰选择离开，市场进入了长期的冰冻期。但是依旧有一部分人在这个市场里选择了坚持下来。3年前区块链世界是怎样的？
                带着这个问题，我们来带到了科银资本，这家成立于2015年的区块链金融科技基金。一起寻找这家成立于比特币阴霾中的风投机构在行业中扎根强大背后的秘密。
                “每当这个时候，我就会回想当年币价从8000人民币跌到900的时候我们怎么做的。当纯粹的逐利者离开时，信仰者会坚持下去，并在最终迎来爆发并获得应得的回报。
                这是科银资本董事长、创始合伙人程剑波（Jacob
                Cheng）先生坐下和我们讲的第一句话。 行业潜修
                谈起来起现在整个市场的骤跌，程剑波对现在正在经历的一切都很从容淡定，在他看来，很多事情的发生在过去都是有经验可以追寻，过去发生的事情这对我们所有人来说都是一个宝贵的财富。
                3年前的算力骤降让科银的所有股东都竖起了汗毛，作为区块链的信仰者和布道者，程剑波非常清楚，一旦算力垮掉，这个行业就没有了。变卖财产，开始挖矿，为比特币全网开始支撑算力，这是科银资本股东们在市场的最寒冬所做的。
                挖矿不是为了盈利，是对比特币网络的维护。“在绝大多数人都不看好比特币的情况下，作为行业的从业者，我们不来保护比特币网络那还有谁来？”
                那一年，科银资本布局的矿场挖出了15000个比特币，实现了9000个比特币的纯利润，我们的矿场在那一年的算力一度达到整个比特币网络的20%。
                “现在和过去相比，真的好太多，我真的感觉不出这次有多惨。”看似豁达的话语，背后是程剑波在区块链行业潜心修炼多年，在市场中最真切的感受
                芯片转型
                程剑波在武汉大学毕业后，进入了当时中国最大的芯片公司——中芯国际工作这期间他参与建设了12寸芯片厂，可以说是中国第一代芯片行业从业者。这段经历好似有一千多个理由能让程剑波与比特币相遇。
                “第一次接触比特币是在2013年，当时刚到澳洲，翻看比特币的早期论坛，开始对比特币有所了解，也认识到矿机的核心就是芯片技术。”比特币背后的POW机制、密码学、货币学、经济学深深的抓住了程剑波的眼球，“当时没有什么资料可以进行系统的学习，我只有把bitcointalk看个遍，在论坛中学习、了解比特币。”
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "80px",
                  marginBottom: "240px"
                }}
              >
                <Icon
                  style={{ fontSize: "50px" }}
                  type="facebook"
                  theme="outlined"
                />
                <Icon
                  style={{ fontSize: "50px", margin: "0 40px" }}
                  type="twitter"
                  theme="outlined"
                />
                <Popover
                  content={content}
                  placement="bottomRight"
                  trigger="click"
                >
                  <Icon
                    id="aa"
                    onClick={this.weChat}
                    style={{ fontSize: "50px" }}
                    type="wechat"
                    theme="outlined"
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
        <Foot ifposition={false} />
      </div>
    );
  }
}
