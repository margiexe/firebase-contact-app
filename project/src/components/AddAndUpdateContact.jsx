import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import * as Yup from "yup"

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required('name is required'),
    email:Yup.string().email('invalid email').required('email is required')
})

function AddAndUpdateContact({isOpen,onClose,isUpdate,contact}) {

    const addContact = async (contact) => {
        try{
            const contactsRef = collection(db, "contacts")
            await addDoc(contactsRef,contact);
            onClose();
            toast.success("contact added successfully");
        } catch(error){
            console.log(error);
        }
    }

    const updateContact = async (contact, id) => {
        try{
            const contactsRef = doc(db, "contacts", id)
            await updateDoc(contactsRef,contact);
            onClose();
            toast.success("contact updated successfully");
        } catch(error){
            console.log(error);
        }
    }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={isUpdate ? {
            name : contact.name,
            email : contact.email,
        } :{
            name :"",
            email :"",
        }}
        onSubmit={(values)=>{
            console.log(values);
            isUpdate ? updateContact(values,contact.id) : addContact(values);
        }}
        >
            <Form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field name="name" className="h-10 border"/>
                    <div className='text-red-500 text-xx'>
                        <ErrorMessage name="name"/>
                    </div>
                </div>
                
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Email</label>
                    <Field type="email" name="email" className="h-10 border"/>
                    <div className='text-red-500 text-xx'>
                        <ErrorMessage name="email"/>
                    </div>
                </div>
                <button className='border bg-orange px-3 py=1.5 self-end'>
                    {isUpdate ? "update":"add contact"}
                </button>
            </Form>
        </Formik>
      </Modal>
    </div>
  );
}



export default AddAndUpdateContact
