import React, { Component } from 'react';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
  } from "bizcharts";
  import DataSet from "@antv/data-set";
export default class Statistics extends Component{
    state={
        data:this.props.data
    }
    componentWillReceiveProps = props => {
        console.log(this.props);
        if (this.props !== props) {
          if (props.data.buy) {
            this.setState({
                data: props.data
            });
          }
          this.props = props;
        }
      };
    componentDidMount(){
       
        
    }
    render() {
        const { DataView } = DataSet;
        const { Html } = Guide;
        const data = [
          {
            item: "事例一",
            count: 40
          },
          {
            item: "事例二",
            count: 21
          },
          {
            item: "事例三",
            count: 17
          },
          {
            item: "事例四",
            count: 13
          },
          {
            item: "事例五",
            count: 9
          }
        ];
        const dv = new DataView();
        dv.source(data).transform({
          type: "percent",
          field: "count",
          dimension: "item",
          as: "percent"
        });
        const cols = {
          percent: {
            formatter: val => {
              val = val * 100 + "%";
              return val;
            }
          }
        };
        return (
          <div >

          
            <Chart
            height={150}
              data={dv}
              scale={cols}
              padding={[0, 0, 0, 0]}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
              <Axis name="percent" />
              <Legend
                position="right"
                offsetY={-window.innerHeight / 2 + 120}
                offsetX={-100}
              />
              
              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
                color="item"
                tooltip={[
                  "item*percent",
                  (item, percent) => {
                    percent = percent * 100 + "%";
                    return {
                      name: item,
                      value: percent
                    };
                  }
                ]}
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
              >
              
              </Geom>
            </Chart>
          </div>
        );
      }
}
