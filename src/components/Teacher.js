import React from 'react';
import firebase from './Firebase/firebase';


class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore().collection('evaluation');
  }

  render() {
    return (
      <div className="App container">
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
        this.setState({usersNum: (this.state.usersNum + 0.2)});
      }.bind(this));
    }.bind(this));
  }


  restartEvaluation() {
    firebase.firestore().collection('evaluation').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firebase.firestore().collection('evaluation').doc(doc.id).delete();
      });
    });
    this.render()
  }

  render() {
    var sumMark = 0;
    return (
      <div>
        <div>Hodnocení: {this.state.average.toFixed(2)}</div>
        <div>Počet hodnocení: {this.state.usersNum.toFixed(0)}</div>
        <button name="submit" className={'submit-btn'} onClick={this.restartEvaluation}>Restart</button>
      </div>
    )
  }
}