import React, { Component } from "react";
import { Tooltip, Icon, Tag, Input, Modal, Popconfirm, message } from "antd";

const confirm = Modal.confirm;

class NewTag extends Component {
  state = {
    visible: this.props.Visible,
    ifedit: this.props.ifedit
  };
  componentWillReceiveProps(nextProps) {
   
    nextProps.ifedit !== this.props.ifedit &&
      this.setState({
        ifedit: nextProps.ifedit
      });
    nextProps.visible !== this.props.visible &&
      this.setState({
        ifedit: nextProps.visible
      });
  }
  visibleset=()=>{
    this.setState({
      visible:false
    })
  }
  tagonClose = () => {
    let that=this
    confirm({
      title: "Do you want to delete these items?",
      content:
        "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000);
        })
          .then(() => {
            that.visibleset()
            message.success("删除成功", [1]);
          })
          .catch(() => console.log("Oops errors!"));
      },
      onCancel() {}
    });
  };
  render() {
    return (
      <Tag
        closable={this.state.ifedit}
        visible={this.state.visible}
        onClose={this.tagonClose}
        
      >
        {this.props.txt}
      </Tag>
    );
  }
}

export default class TAmod extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    ifedit: false,
    num: 1,
    tagTitle: "标签分类名称",
    bordercolor: true,
    ifdel: false
  };
  handleIfedit = () => {
    let fig = this.state.ifedit;
    console.log(fig);
    this.setState({
      ifedit: !fig
    });
    console.log(this.state.ifedit);
  };
  titleChange = e => {
    console.log(e.target.value);
    this.setState({
      tagTitle: e.target.value
    });
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };
  tagonClose = e => {
   
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    const fig = e.target.value.replace(/^\s+|\s+$/g, "");
    if (fig.length > 8) {
      this.setState({
        bordercolor: false,
        inputValue: fig
      });
    } else {
      this.setState({
        bordercolor: true,
        inputValue: fig
      });
    }
  };

  handleInputConfirm = e => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;

    if (e.target.value.length > 8) {
      message.error("标签名不能超过8个字符", [1]);
      return false;
    } else {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      } else {
        if (tags.indexOf(inputValue) !== -1) {
          message.error("同类目下标签名不能相同", [1]);
        }
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: ""
      });
    }
  };

  saveInputRef = input => (this.input = input);
  // 删除确认
  confirm = e => {
    this.props.returnIndex(this.props.index);
    message.success("删除成功");
  };
  cancel = e => {};

  render() {
    const { tags, inputVisible, inputValue, ifedit } = this.state;
    return (
      <div>
        <div style={{ background: "#F0F2F5", padding: "10px 20px" }}>
          <div style={{ background: "#fff", overflow: "hidden" }}>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "1px solid #E9E9E9",
                padding: "20px 32px 10px",
                position: "relative"
              }}
            >
              {!ifedit ? this.state.tagTitle : ""}
              {ifedit ? (
                <Input
                  onChange={this.titleChange}
                  size="small"
                  style={{ width: "80px" }}
                  defaultValue={this.state.tagTitle}
                />
              ) : (
                ""
              )}
              <span
                style={{
                  position: "absolute",
                  right: "32px",
                  bottom: "10px",
                  color: "#004FFF",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                <span onClick={this.handleIfedit}>
                  {ifedit ? "[保存] " : "[编辑]"}
                </span>

                <Popconfirm
                  title="确认删除？"
                  onConfirm={this.confirm}
                  onCancel={this.cancel}
                  okText="确认"
                  cancelText="取消"
                >
                  {ifedit ? <span style={{ color: "red" }}>[删除]</span> : ""}
                </Popconfirm>
              </span>
            </h4>
            <div style={{ padding: "15px 32px", background: "#fff" }}>
              <div>
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 8;
                  const tagElem = (
                    <NewTag
                      Visible={true}
                      key={tag}
                      txt={tag}
                      ifedit={this.state.ifedit}
                      onClose={this.tagonClose}
                      afterClose={
                        this.state.ifdel
                          ? () => {}
                          : () => this.handleClose(tag)
                      }
                    />
                  );
                  return tagElem;
                })}
                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{
                      width: 78,
                      borderColor: this.state.bordercolor ? "blue" : "red"
                    }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onPressEnter={this.handleInputConfirm}
                    onBlur={this.handleInputConfirm}
                  />
                )}
                {!inputVisible &&
                  this.state.ifedit && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: "#fff", borderStyle: "dashed" }}
                    >
                      <Icon type="plus" /> 添加
                    </Tag>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
