import React, { Component } from 'react'
import firebase from 'firebase/firebase-app';

let uuid = require('uuid')

const firebaseConfig = {
    apiKey: "AIzaSyCJwKkKs_kIwG2nvge12ZcRAyT42A5T4WA",
    authDomain: "uservey-c6f8b.firebaseapp.com",
    databaseURL: "https://uservey-c6f8b.firebaseio.com",
    projectId: "uservey-c6f8b",
    storageBucket: "uservey-c6f8b.appspot.com",
    messagingSenderId: "1963930293",
    appId: "1:1963930293:web:b75b4ff6a03305ed5dc4fc",
    measurementId: "G-W80X1GCMZB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


export default class Usurvey extends Component {
    nameSubmit=(event)=>{
        event.preventDefault()
        var studentName = this.refs.name.value;
        this.setState({studentName: studentName}, function(){
            console.log(this.state)
        })
    }
    answerSelected=(event)=>{
      var answers = this.state.answers;
      if(event.target.name==='answer1'){
        answers.answer1 = event.target.value
      }else if(event.target.name==='answer2'){
          answers.answer2 = event.target.value
      }else if(event.target.name==='answer3'){
        answers.answer3 = event.target.value
    }
    this.setState({answers: answers}, function(){
        console.log(this.state)
    })
    }
    questionSubmits=()=>{
        firebase.database().ref('users/'+ this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
        this.setState({isSubmitted: true})
        }
    
    constructor(props) {
        super(props)
    
        this.state = {
             uid: uuid.v1(),
             studentName: '',
             answers: {
                 answer1: '',
                 answer2: '',
                 answer3: ''
             },
             isSubmitted: false
        }

    }
    render() {
        let studentNames;
        let questions;

        if(this.state.studentName===''&& this.state.isSubmitted===false){
            studentNames = <div>
                <h3>Hey Student, please let us know your name</h3>
                <form onSubmit={this.nameSubmit}>
                    <input className="namy" type="text" placeholder="enter your name" ref="name"/>
                </form>
            </div>
            questions = ''
        }else if(this.state.studentName !== '' && this.state.isSubmitted===false){
        studentNames = <h3>Welcome to Usurvey, {this.state.studentName}</h3>;
            questions = <div>
                <h2>Here are some question {this.state.studentName}</h2>

                <form onSubmit={this.questionSubmits}>
                    <div className='card'>
                        <label>What kind of courses your like the most</label><br/>
                        <input type="radio" name="answer1" value='Technology' onChange={this.answerSelected}/>   Technology
                        <input type="radio" name="answer1" value='Design' onChange={this.answerSelected}/>   Design
                        <input type="radio" name="answer1" value='Marketing' onChange={this.answerSelected}/>  Marketing
                    </div><hr></hr>
                    <div className='card'>
                        <label>You are a:</label><br/>
                        <input type="radio" name="answer2" value='student' onChange={this.answerSelected}/>  Student
                        <input type="radio" name="answer2" value='in-job' onChange={this.answerSelected}/>   In Job
                        <input type="radio" name="answer2" value='looking-job' onChange={this.answerSelected}/>   Looking job
                    </div>
                    <hr></hr>
                    <div className='card'>
                        <label>Is online learning helpful</label><br/>
                        <input type="radio" name="answer3" value='yes' onChange={this.answerSelected}/>   Yes
                        <input type="radio" name="answer3" value='no' onChange={this.answerSelected}/>   No
                        <input type="radio" name="answer3" value='maybe' onChange={this.answerSelected}/>   Maybe
                    </div>
                    <input className="feedback-button" type="submit" value="Submit"/>
                </form>
            </div>
    }else if(this.state.isSubmitted === false){
    studentNames = <h2>Thanks, {this.state.studentName}</h2>
    }
        return (
            <div>
                {studentNames}
                ----------
                {questions}
            </div>
        )
    }
}
