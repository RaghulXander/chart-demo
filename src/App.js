import React from 'react'
import './App.css';

import keys from 'lodash/keys'
import map from 'lodash/map'
import isObject from 'lodash/isObject'

import DoughNutChart from './Chart'
import data from './data.json'

const pallette = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: null,
      data: null,
      chartData: []
    };
  }

  componentDidMount() {
    const currentIndex = Object.keys(data).length > 0 ? Object.keys(data)[0] : null
    this.getChartData(currentIndex, data)
    this.setState({
      currentIndex,
      isEmpty: Object.keys(data).length === 0,
      originalData: data,
      prevIndex: ''
    })
  }

  getChartData = (currentIndex, data) => {
    const currentData = []
    map(keys(data), chartItem => {
      const parentNode = data[chartItem]
      if (chartItem === currentIndex) {
        const subItems = keys(parentNode);
        map((subItems), (subItem, index) => {
          if (isObject(parentNode[subItem])) {
            currentData.push({
              key: subItem,title:subItem, value: parentNode[subItem].overall, color: pallette[index]
            })
          } else if (subItem !== "overall" && parentNode[subItem] > 0) {
            currentData.push({
              key: subItem, title:subItem, value: parentNode[subItem], color: pallette[index]
            })
          }
        })
        this.setState({
          chartData: currentData,
          nextTree: parentNode,
          currentIndex
        })
      } else {
        this.getChartData(chartItem)
      }
    })
  }

  handleSegmentClick = (props, index) => {
    const { chartData, nextTree } = this.state
    const nextIndex = chartData[index].key
    this.getChartData(nextIndex, nextTree)
  }

  getParentIndex = (currentIndex, originalData) => {
    map(originalData, (key,value) => {
      if (isObject(originalData[key])) {
        if (keys(originalData[key]).includes(currentIndex)) {
          return key
        } else {
          this.getParentIndex(currentIndex, originalData[key])
        }
          
      } else if (key === currentIndex) return ""

    })
  }

  handleBack = (props, index) => {
    // const { originalData, currentIndex } = this.state
    // const parentIndex = this.getParentIndex(currentIndex, originalData)

    // if (currentIndex) {
    //   this.getChartData(parentIndex, originalData)
    // }

    const currentIndex = Object.keys(data).length > 0 ? Object.keys(data)[0] : null
    this.getChartData(currentIndex, data)
  }

  render() {
    const {chartData} = this.state
    console.log("🚀 ~ file: App.js ~ line 115 ~ App ~ render ~ chartData", chartData)
    return (
      <div className="container">
        <div className="header">Doughnut Chart</div>
        <div className="backHandler">
          <button onClick={this.handleBack}>
            Back
          </button>
        </div>
        <div className="chartContainer">
          <DoughNutChart chartData={chartData} onSegmentClick={this.handleSegmentClick}/>
        </div>
      </div>
    )
  }
}
export default App;
