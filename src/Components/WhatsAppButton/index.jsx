import './style.css';

const WhatsAppButton = ()=> {
    const phoneNumber = +96181059118;
    const message = 'Can I get more infos about this?';
    
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