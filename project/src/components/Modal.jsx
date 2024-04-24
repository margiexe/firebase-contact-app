import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'

function Modal({onClose, isOpen, children}) {
  return createPortal(
    <>
    {isOpen && (
        <>
        <div className='relative z-50 m-auto min-h-[200px] max-w-[80%] bg-white p-4'>
            <div className='flex justify-end'>
            <IoMdClose onClick={onClose} 
            className='self-end text-2xl'/>   
            </div>
            {children}
        </div>
        <div onClick={onClose} className='absolute top-0 z-40 h-screen w-screen backdrop-blur'/>
        </>
        )}
    </>
  ,document.getElementById("modal-root"));
}

export default Modal
