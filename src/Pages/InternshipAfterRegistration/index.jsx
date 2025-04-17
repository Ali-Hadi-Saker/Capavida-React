import WhatsAppButton from '../../Components/WhatsAppButton';
import './style.css'

const InternshipAfterRegistration = ()=> {
    return(
        <div className='message-container'>
            <span>Please verify your email and We Will get back within a week</span>
            <span>For any question contact us using Whatsapp</span>
            <WhatsAppButton/>
        </div>
    )
}

export default InternshipAfterRegistration;