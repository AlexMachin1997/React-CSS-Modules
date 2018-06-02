import React, { Component } from 'react'; //Imports React
import classes from './App.css'; //Imports App.css so styling attributes can be added
import Person from "./Person/Person"; //Importing Person From Person.js

//Extends React Comp
class App extends Component {

  //Reserved Keyword
  state = {
    persons : [
      {id: "1", name: "Alex" , age : 20},
      {id: "2", name: "Emma" , age : 17},
      {id: "3", name: "Richard" , age : 28},
      {id: "4", name: "Joanne" , age : 28},
    ],
    personStatus: false
  }
  
  deletePerson = (personIndex) => {
    const persons = [...this.state.persons]; //Copies Array Safely
    persons.splice(personIndex, 1) //Removing
    this.setState({persons: persons}); //Set persons(old state) to equal persons(new state), the componets are then rendered
  }


  //When This Function Is Used It Will Change The Targeted Value Which Is Richard
  //event is the input - event.target.value (Asigns New Value)
  //Event wil automatically be passed by react 
  nameChangedHandler = (event, id) => {

    //Find Index
    const personIndex = this.state.persons.findIndex(p => {
      return p.id  === id;
    });

    //Dont mutate the state directly, instead copy it then modify it
    //This is the new object in memory and it can be safely mutated
    const person = {
      ...this.state.persons[personIndex]
    };

    //Update the person name by going to person.name of the copied object
    //from before
    person.name = event.target.value;

    //Update the person array
    const persons = [...this.state.persons]; //Fetch Array
    persons[personIndex] = person; // Set O

    //Setting The State To THe New Person, The Updated State 
    this.setState({persons : persons})
  }

  //If The doesShow is true it will show persons to false
  //If The doesShow is false the show persons is true
  togglePersonsHandler = () => {
    const doesShow = this.state.personStatus;
    this.setState({personStatus: !doesShow});
  }
 
  //JSX Note:
  //Render + Return are needed to allow the js to be rendered
  //className is the wrapper it is used to style the page section
  // Person is the function, it contains name, age and references the click handler
  render() {

    let persons = null;

    //Any changes REACT-DOM will re-render the component
    if(this.state.personStatus) {
      persons = (
        <div>
          {/*
           - Loops Through The Array, Uses person varialbe to display
           the name and age of the users defined in the inital state

          - The props are passed in - key, name, age, click and changed
          
          - The key, name and age are the inital props, click and changed are events with functions
          
          - Clicked function deletes the user based on index number, if 1 is clicked then 1 is removed
          
          - Changed allows an event to occur, that event is inputing a new name,
            when the name is updated so is the value above which shows the name

          */}
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => this.deletePerson(index)}  //Deletes The Item On Click And Rec
              changed = {(event)  => this.nameChangedHandler(event, person.id)}/> //Event And Person ID
            })}
        </div>
      );
    }


    const assignedClasses = [];
    
    if(this.state.persons.length <=4) {
      assignedClasses.push(classes.green); // classes = ['green']
     }
     
     if(this.state.persons.length <=3) {
      assignedClasses.push(classes.yellow) // classes = ['yellow']
     }
     
     if(this.state.persons.length <=2) {
      assignedClasses.splice(classes.yellow) // Removes yellow
      assignedClasses.push(classes.red) // classes = ['red']
     }
     
     if(this.state.persons.length <=1) {
      assignedClasses.splice(classes.red) // Removes yellow
      assignedClasses.push(classes.bold) //classes = ['red','bold']
     }

     if(this.state.persons.length <=0) {
      assignedClasses.splice(classes.red) // Removes yellow
      assignedClasses.splice(classes.bold) //classes = ['red','bold']
     }

    return (
      <div className={classes.App}>
        
        {/* Simple Heading */}
        <h1> My First React App</h1>
        <p className={assignedClasses.join(' ')}> This is really working </p>
        {/* On click of the button it updates the states by adding additional prop details*/}        
        
        <button
        onClick ={this.togglePersonsHandler}>Toogle Persons</button>      
        {persons}{/* Passes In Person Object Defined Above*/}         
      </div>
    );
  }
}

//Exports this comp and then it gets imported into the injex.js
export default App;
