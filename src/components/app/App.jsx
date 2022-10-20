import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import Form from "../form/Form";
import Contacts from "../contacts/Contacts";
import Filter from "../filter/Filter";
import { DivBox, TitleBox, SecondaryTitleBox } from "./AppStyled";


export function App () {
const [contacts, setContacts] = useState(() => {
  const contactsValue = JSON.parse(localStorage.getItem('contacts'));
  return contactsValue ?? [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},]
});
const [name, setName] = useState("");
const [filter, setFilter] = useState("");
const [number, setNumber] = useState("");


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))  
  }, [contacts]);


 
  const handleInputChange = (e) => {
    const {name, value} = e.target;  
    
    switch(name) {
      case "filter":
        return setFilter(value);
      case "number":
        return setNumber(value); 
      case "name":
        return setName(value); 
      default:
      return;
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    chekingContacts();

    setContacts((prevContacts) => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevContacts, newContact]      
    });
  };


  const serchingFilter = (e) => {
    const value = e.currentTarget.value;
    setFilter(value);
  };  
  
  const contactFiltering = () => { 
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
  };

  const removeContact = (contactId) => {  
      setContacts((prevContacts) => {   
      const newContacts = prevContacts.filter(contact => contact.id !== contactId);
      return newContacts;
    })
  };


  const chekingContacts = () => {
    const findContact = contacts.find((contact) => contact.name === name);

    if (findContact) { 
      alert(`${name} is already in contacts`);      
    }                
  };
  
  
    const filteredContacts = contactFiltering();

    return (
      <DivBox>
         
       <TitleBox>Phonebook</TitleBox>

       <Form 
       onSubmit={handleSubmit}
       onChange={handleInputChange}
       nameValue={name}
       numberValue={number}
       />

       <SecondaryTitleBox>Contacts</SecondaryTitleBox>

       <Contacts
       contacts={filteredContacts}
       onClick={removeContact}
       />
       <Filter 
       filterValue={filter}
       onChange={serchingFilter}/>

      </DivBox>
    );
  };







// export class App extends Component {
//   state = {
//     contacts: [   
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
//     name: '',
//     filter: '',
//     number: ''
//   }


//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if(parsedContacts) {
//       this.setState({contacts: parsedContacts})
//     }
//   };


//   componentDidUpdate(prevProps, prevState) {
//     if(this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

 
//   handleInputChange = (e) => {
//     this.setState(
//         {[e.currentTarget.name]: e.currentTarget.value}
//     );
//   }


//   handleSubmit = e => {
//     e.preventDefault();
//     this.chekingContacts();
//     this.setState(prevState => {
//       const newContact = {
//         id: nanoid(),
//         name: this.state.name,
//         number: this.state.number,
//       };
//       return {
//         contacts: [newContact, ...prevState.contacts],
//         name: '',
//         number: '',
//       };
//     });
//   };


//   serchingFilter = (e) => {
//     this.setState({ filter: e.currentTarget.value });
//   }  
  
//   contactFiltering = () => { 
//     const { filter, contacts } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
//   }

//   removeContact = (contactId) => {  
//     this.setState(prevState => ({   
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }))
//   }


//   chekingContacts = () => {
//     const { contacts, name } = this.state; 
//     const findContact = contacts.find((contact) => contact.name === name);

//     if (findContact) { 
//       alert(`${this.state.name} is already in contacts`);      
//     }                
//   };
  
//   render() {
//     const filter = this.contactFiltering();

//     return (
//       <DivBox>
         
//        <TitleBox>Phonebook</TitleBox>

//        <Form 
//        onSubmit={this.handleSubmit}
//        onChange={this.handleInputChange}
//        nameValue={this.state.name}
//        numberValue={this.state.number}
//        />

//        <SecondaryTitleBox>Contacts</SecondaryTitleBox>

//        <Contacts
//        contacts={filter}
//        onClick={this.removeContact}
//        />
//        <Filter 
//        filterValue={this.state.filter}
//        onChange={this.serchingFilter}/>

//       </DivBox>
//     );
//   };
// }

