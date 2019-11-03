import React from 'react';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.saveMarks = this.saveMarks.bind(this);
    this.state = {
      data: [
              {criteria: 'Postoj', mark: ''},
              {criteria: 'Informace', mark: ''},
              {criteria: 'Obecné', mark: ''}
            ],
      sent: false
    }
  }

  saveMarks() {
    this.state.data.map(criteria => {
      if (criteria['mark'] === '') {
        console.log("pole nejsou vyplnena");
      }
      else {
        console.log(this.state.data)
        this.setState({sent: true});
      }
      return true;
    })

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
    if (this.state.sent) {
    }
    else {

    }
    return (
      <div className="App" className="container">
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
      <div>
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
      active : 0,
      scale : [
              {name: 'výborní', value: '1'},
              {name: 'dobrý', value: '2'},
              {name: 'ušel', value: '3'},
              {name: 'hrůza', value: '4'},
              {name: 'děs', value: '5'},
            ]
    }
  }

  sendData(e, mark) {
    this.props.selectedMark(mark);
    this.setState({active: mark});
  }

  render() {
    return (
      <div className={"mark-container"}>
        {this.state.scale.map(option => { return <button key={option['name']} name={option['name']} className={option['value'] === this.state.active ? 'active-mark' : ''} onClick={(e) => this.sendData(e, option['value'])}>{option['name']}</button> })}
      </div>
    )
  }
}