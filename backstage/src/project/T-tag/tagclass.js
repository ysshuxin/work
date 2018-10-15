import React, { Component } from "react";
import { Tooltip, Icon, Tag, Breadcrumb, Input, Modal } from "antd";
const confirm={Modal}
export default  class TAmod extends Component {
    state = {
      tags: [],
      inputVisible: false,
      inputValue: "",
      ifedit: false,
      num: 1,
      tagTitle: "标签分类名称"
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
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };
  
    handleInputChange = e => {
      const fig = e.target.value.replace(/^\s+|\s+$/g, "");
      this.setState({ inputValue: fig });
    };
  
    handleInputConfirm = () => {
      const state = this.state;
      const inputValue = state.inputValue;
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
  
      this.setState({
        tags,
        inputVisible: false,
        inputValue: ""
      });
    };
  
    saveInputRef = input => (this.input = input);
  
    showConfirm = () => {
      confirm({
        title: "Do you Want to delete these items?",
        content: "Some descriptions",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    };
  
    render() {
      const { tags, inputVisible, inputValue, ifedit } = this.state;
  
      return (
        <div>
          <div style={{ background: "#F0F2F5", padding: "20px" }}>
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
                {!ifedit ? this.state.tagTitle:""}
                {ifedit ? (
                  <Input
                    onChange={this.titleChange}
                    size="small"
                    style={{ width: "80px" }}
                    defaultValue={this.state.tagTitle}
                  />
                ):""}
                <span
                  onClick={this.handleIfedit}
                  style={{
                    position: "absolute",
                    right: "32px",
                    bottom: "10px",
                    color: "#004FFF",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >[{ifedit ? "保存" : "编辑"}]
                </span>
              </h4>
  
              <div style={{ padding: "15px 32px", background: "#fff" }}>
                <div>
                  {tags.map((tag, index) => {
                    const isLongTag = tag.length > 8;
                    const tagElem = (
                      <Tag
                        style={{ margin: "0 18px 18px 18px" }}
                        key={tag}
                       
                        closable={this.state.ifedit}
                        onClose={() => {
                          return false;
                        }}
                        afterClose={() => this.handleClose(tag)}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: "#fff", borderStyle: "dashed" }}
                    >
                      <Icon type="plus" /> New Tag
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