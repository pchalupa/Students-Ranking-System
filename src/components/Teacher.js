import React from 'react';
import firebase from './Firebase/firebase';


class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore().collection('evaluation');
    this.state = {
      validate: localStorage.getItem('validate')
    }
  }

  render() {
    return (
      <div className={"App container"} style={{height: window.innerHeight + 'px'}}>
        <div className={"title"}><h1>Učitel</h1></div>
        <Results />
      </div>
    )
  }
}

export default Teacher;

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.restartEvaluation = this.restartEvaluation.bind(this);
    this.state = {
      sumMark: 0,
      sumWeight: 0,
      average: 0,
      usersNum: 0
    }
  }

  componentDidMount() {
    const db = firebase.firestore().collection('evaluation');
    db.onSnapshot(function() {
      db.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          this.setState({sumMark: (this.state.sumMark + (doc.data()['mark'] * doc.data()['weight'])), sumWeight: (this.state.sumWeight + doc.data()['weight']), average: (this.state.sumMark / this.state.sumWeight)});
        }.bind(this));
        db.get().then(snap => {
          this.setState({usersNum: (snap.size / 5)});
       });
      }.bind(this));
    }.bind(this));
  }

  restartEvaluation() {
    firebase.firestore().collection('evaluation').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firebase.firestore().collection('evaluation').doc(doc.id).delete();
      });
    });
    this.setState({sumMark: 0, sumWeight: 0, average: 0, usersNum: 0});
  }

  render() {
    return (
      <div>
        <div>Hodnocení: {this.state.average.toFixed(2)}</div>
        <div>Počet hodnocení: {this.state.usersNum.toFixed(0)}</div>
        <button name="submit" className={'submit-btn'} onClick={this.restartEvaluation}>Restart</button>
      </div>
    )
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.inputPass = this.inputPass.bind(this);
    this.validatePass = this.validatePass.bind(this);
    this.state = {
      inputPass: ""
    }
  }

  inputPass(event) {
    this.setState({inputPass: event.target.value});
  }

  validatePass() {
    if (this.state.inputPass === "test") {
      localStorage.setItem('validate', true);
    }
  }

  render() {
    return (
      <div>
        <input type="text" name="password" onChange={this.inputPass}/>
        <button onClick={this.validatePass}>odeslat</button>
      </div>
    )
  }
}