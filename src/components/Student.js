import React from 'react';
import firebase from './Firebase/firebase';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore().collection('evaluation');
    this.saveMarks = this.saveMarks.bind(this);
    this.state = {
      data: [
        { criteria: 'Postoj', mark: '', weight: 5},
        { criteria: 'Informace', mark: '', weight: 5},
        { criteria: 'Oblečení', mark: '', weight: 5},
        { criteria: 'Vlasy', mark: '', weight: 5},
        { criteria: 'Obecné', mark: '', weight: 5}
      ],
      sent: false
    }
  }

  saveMarks() {
    if (this.checkFill())
    {
      this.state.data.map(criteria => {
        this.db.add(criteria);
        return true;
      })
      this.setState({sent : true});
    }
  }

  checkFill() {
    this.state.data.map(criteria => {
      if (criteria['mark'] === '') {
        console.log("pole nejsou vyplnena");
        return false;
      }
      return true;
    })
    return true;
  }

  onAddResult = (result) => {
    this.state.data.map(item => {
      if (item['criteria'] === result[0]) {
        item['mark'] = result[1];
      }
      return true;
    })
  }

  render() {
    return (
      <div className="App container">
        <div className={"title"}><h1>Hodnocení žáků</h1></div>
        {!this.state.sent ? this.state.data.map(data => { return <Criteria key={data['criteria']} name={data['criteria']} resultMark={this.onAddResult} /> }) : <div className={'sended'}>Odeslano</div>}
        {!this.state.sent ? <button name="submit" className={'submit-btn'} onClick={this.saveMarks}>Odeslat</button> : ''}
      </div>
    )
  }
}

export default Student;

class Criteria extends React.Component {

  constructor(props) {
    super(props)
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  callbackFunction(resultMark) {
    this.props.resultMark([this.props.name, resultMark])
  }

  render() {
    return (
      <div className={"criteria-container"}>
        <h2>{this.props.name}</h2>
        <Marks selectedMark={this.callbackFunction} />
      </div>
    )
  }
}

class Marks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      scale: [
        { name: '1', value: '1' },
        { name: '1-', value: '2' },
        { name: '2', value: '3' },
        { name: '3', value: '4' },
        { name: '4', value: '5' },
      ]
    }
  }

  sendData(e, mark) {
    this.props.selectedMark(mark);
    this.setState({ active: mark });
  }

  render() {
    return (
      <div className={"mark-container"}>
        {this.state.scale.map(option => { return <button key={option['name']} name={option['name']} className={option['value'] === this.state.active ? 'active-mark' : ''} onClick={(e) => this.sendData(e, option['value'])}>{option['name']}</button> })}
      </div>
    )
  }
}