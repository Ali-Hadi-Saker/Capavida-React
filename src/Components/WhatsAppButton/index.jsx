import './style.css';

const WhatsAppButton = ()=> {
    const phoneNumber = 71357928;
    const message = 'How can we help you';
    
    const handleClick = ()=> {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank');
    }



    return(
        <div>
            <button className='whatsapp-btn' onClick={handleClick}>
            💬 Chat on WhatsApp
            </button>
        </div>
    )
}

export default WhatsAppButton;