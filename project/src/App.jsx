import { useEffect,useState } from 'react'
import Navbar  from './components/Navbar'
import { IoMdSearch } from 'react-icons/io';
import { FaCirclePlus } from "react-icons/fa6";
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from "./config/firebase"
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db,'contacts');
        

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc)=> {
            return{
              id: doc.id,
              ...doc.data(),
            };
          });

          const filterContacts = contactLists.filter(contacts => contacts.name.toLowerCase().includes(value.toLowerCase()))

          setContacts(filterContacts);

          return filterContacts;

        });
  }

  const [contacts, setContacts] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclouse(false);
 
  useEffect(() => {
    const getContacts = async () =>{
      try{
        const contactsRef = collection(db,'contacts');
        

        onSnapshot(contactsRef,(snapshot) => {
          const contactLists = snapshot.docs.map((doc)=> {
            return{
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });

        
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();

  },[]);

  
  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
        <Navbar></Navbar>
        <div className='flex gap-2'>
        <div className='relative flex flex-grow items-center'>
          <IoMdSearch className='absolute ml-1 text-3xl text-white' />
          <input
          onChange={filterContacts} 
            type="text" 
            className='h-10 flex-grow rounded-md border border-white 
            bg-transparent pl-10 text-white' />
        </div> 
      
          <FaCirclePlus 
          onClick={onOpen}
          className='cursor-pointer text-5xl text-white'/>
      
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact}/>
          ))}
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center"/>
    </>
    
  );
}

export default App
