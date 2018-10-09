import React, { Component } from "react";
import {  Input, Button, Table, Radio, Popover} from "antd";


const RadioGroup = Radio.Group;
const { TextArea } = Input;


const data = [{
  key:"1",
    logo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538129508456&di=45b498d2c917923589dea7f6f10355e9&imgtype=0&src=http%3A%2F%2Fp2.gexing.com%2Fshaitu%2F20120810%2F1806%2F5024dd37a5662.jpg",
    projectname: 'test',
    token: "etc",
    state: 'aa',
    from: 'bb',
    recordname: 'cc',
    time:"2018",
    grade: 'dd',
    operate: 'ee'
  },
  {
    key:"2",
    logo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538129508456&di=45b498d2c917923589dea7f6f10355e9&imgtype=0&src=http%3A%2F%2Fp2.gexing.com%2Fshaitu%2F20120810%2F1806%2F5024dd37a5662.jpg",
    projectname: 'test',
    token: "etc",
    state: 'aa',
    from: 'bb',
    recordname: 'cc',
    time:"2018",
    grade: 'dd',
    operate: 'ee'
  },
  {
    key:"3",
    logo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538129508456&di=45b498d2c917923589dea7f6f10355e9&imgtype=0&src=http%3A%2F%2Fp2.gexing.com%2Fshaitu%2F20120810%2F1806%2F5024dd37a5662.jpg",
    projectname: 'test',
    token: "etc",
    state: 'aa',
    from: 'bb',
    recordname: 'cc',
    time:"2018",
    grade: 'dd',
    operate: 'ee'
  },
  {
    key:"4",
    logo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538129508456&di=45b498d2c917923589dea7f6f10355e9&imgtype=0&src=http%3A%2F%2Fp2.gexing.com%2Fshaitu%2F20120810%2F1806%2F5024dd37a5662.jpg",
    projectname: 'test',
    token: "etc",
    state: 'aa',
    from: 'bb',
    recordname: 'cc',
    time:"2018",
    grade: 'dd',
    operate: 'ee'
  }];

export default class Fundprojectlist extends Component {
  callback = key => {
    console.log(key);
  };

  componentWillMount = () => {};

  render() {
    const Tabletitle = [
      {
        title: "logo",
        dataIndex: "logo",
        key: "logo",
        align: "center",
        render: (text, record, index) => {
          return <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={text} alt=""/>;
        }
      },
      {
        title: "名称",
        dataIndex: "projectname",
        align: "center",
        key: "projectname"
      },
      {
        title: "代币符号",
        align: "center",
        dataIndex: "token",
        key: "token"
      },
      {
        title: "状态",
        dataIndex: "state",
        align: "center",
        key: "state",
        render: (text, record, index) => (
            <Popover
              style={{ width: "295px", height: "218px", border: "none" }}
              placement="bottomLeft"
              content={
                <div>
                  <h3 style={{ fontSize: "14px", fontWeight: "600" }}>
                    状态
                  </h3>
                  <RadioGroup defaultValue={""} onChange={""}>
                    <p>
                      <Radio value={1}>待上会</Radio>
                      <Radio style={{ marginLeft: "50px" }} value={2}>
                        Pass
                      </Radio>
                    </p>
                    <p>
                      <Radio value={3}>确定意向</Radio>
                      <Radio style={{ marginLeft: "36px" }} value={4}>
                        已打币
                      </Radio>
                    </p>
                   
                  </RadioGroup>
                  <h3 style={{ fontSize: "14px", fontWeight: "600" }}>
                  备注
                </h3>
                <TextArea defaultValue={""} />
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {}}
                      style={{
                        width: "50px",
                        height: "24px",
                        textAlign: "center",
                        fontSize: "14px",
                        background: "#fff",
                        color: "#000",
                        padding: "0",
                        marginRight: "24px",
                        marginTop: "8px"
                      }}
                      type="primary"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={() => {}}
                      style={{
                        width: "50px",
                        height: "24px",
                        textAlign: "center",
                        fontSize: "14px",
                        padding: "0",
                        marginTop: "8px"
                      }}
                      type="primary"
                    >
                      确认
                    </Button>
                  </div>
                </div>
              }
              trigger="click"
            >
              <div style={{ position: "relative" }}>
               pass
                <span
                  style={{
                    marginLeft: "5px",
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginBottom: "2px",
                    width: "0",
                    height: "0",
                    borderLeft: "4px solid transparent",
                    borderRight: " 4px solid transparent",
                    borderTop: "6px solid #000"
                  }}
                />
              </div>
            </Popover>
          )
      },
      {
        title: "来源",
        dataIndex: "from",
        align: "center",
        key: "from"
      },
      {
        title: "跟进人",
        dataIndex: "recordname",
        align: "center",
        key: "recordname"
      },
      {
        title: "最近修改",
        dataIndex: "time",
        align: "center",
        key: "time"
      },
      {
        title: "评级",
        key: "grade",
        align: "center",
        dataIndex: "grade",
        render: (text, record, index) => (
          <Popover
            style={{ width: "295px", height: "218px" }}
            placement="bottomLeft"
            content={
              <div className="levelalert">
                <h3 style={{ fontSize: "14px", fontWeight: "600" }}>评级</h3>
                <RadioGroup>
                  <p>
                    <Radio name="A+" value={1}>
                      A+
                    </Radio>
                    <Radio name="A" style={{ marginLeft: "50px" }} value={2}>
                      A
                    </Radio>
                    <Radio name="A-" style={{ marginLeft: "50px" }} value={3}>
                      A-
                    </Radio>
                  </p>
                  <p>
                    <Radio name="B+" value={4}>
                      B+
                    </Radio>
                    <Radio name="B" style={{ marginLeft: "50px" }} value={5}>
                      B
                    </Radio>
                    <Radio name="B-" style={{ marginLeft: "50px" }} value={6}>
                      B-
                    </Radio>
                    <Radio name="C" style={{ marginLeft: "50px" }} value={7}>
                      C
                    </Radio>
                  </p>
                </RadioGroup>
                <h3 style={{ fontSize: "14px", fontWeight: "600" }}>
                  评级分析
                </h3>
                <TextArea defaultValue={""} />
                <div style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => {}}
                    style={{
                      width: "50px",
                      height: "24px",
                      textAlign: "center",
                      fontSize: "14px",
                      background: "#fff",
                      color: "#000",
                      padding: "0",
                      marginRight: "24px",
                      marginTop: "8px"
                    }}
                    type="primary"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={() => {}}
                    style={{
                      width: "50px",
                      height: "24px",
                      textAlign: "center",
                      fontSize: "14px",
                      padding: "0",
                      marginTop: "8px"
                    }}
                    type="primary"
                  >
                    确认
                  </Button>
                </div>
              </div>
            }
            trigger="click"
          >
            <div style={{ position: "relative" }}>
             A
              <span
                style={{
                  marginLeft: "5px",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginBottom: "2px",
                  width: "0",
                  height: "0",
                  borderLeft: "4px solid transparent",
                  borderRight: " 4px solid transparent",
                  borderTop: "6px solid #000"
                }}
              />
            </div>
          </Popover>
        )
      },
      {
        title: "操作",
        dataIndex: "operate",
        align: "center",
        key: "operate",
        render: (text, record, index) => {
          return (
            <div
              style={{ margin: "0 auto", color: "red" }}
              onClick={() => {
              }}
            >
              删除
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <Table
        style={{ textAlign:"center" }}
        columns={Tabletitle}
        dataSource={data}
        pagination={
            {
              style:{marginRight:"30px"},
              size:"big",
              total:4,
               showSizeChanger :true,
               showQuickJumper:true
            }
          }
        onRow={(record, rowkey) => {
          return {
            onMouseEnter: () => {}
          };
        }}
      />
      </div>
    );
  }
}
