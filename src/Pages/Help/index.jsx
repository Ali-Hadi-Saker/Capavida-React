import React from 'react';
import './style.css';

const Help = () => {
    const helpSections = [
        {
            title: "Getting Started",
            items: [
                {
                    question: "How do you create a marketplace?",
                    answer: (
                        <ol>
                            <li>Open Menu</li>
                            <li>Click Marketplace</li>
                            <li>At the bottom right corner click Create New Marketplace</li>
                            <li>Fill in the form and press Create</li>
                        </ol>
                    )
                },
                {
                    question: "How do you edit your profile?",
                    answer: (
                        <ol>
                            <li>Open Menu</li>
                            <li>Click Profile</li>
                            <li>Press Edit on the middle of the left side of the page</li>
                        </ol>
                    )
                }
            ]
        },
        {
            title: "Privacy & Security",
            items: [
                {
                    question: "How does CapaVida protect my privacy and keep my information secure?",
                    answer: "CapaVida ensures data confidentiality by controlling who has access to non-public information, documents, files, etc. Access control is based on the principle of least privilege, granting access only on a need-to-know basis. All data is end-to-end encrypted to ensure that only authorized people can access it."
                }
            ]
        },
        {
            title: "Service Coverage",
            items: [
                {
                    question: "Is the Website national or international?",
                    answer: "Currently, CapaVida only operates in Lebanon. We are working on including Arab countries such as Sudan, UAE, and Saudi Arabia within our services."
                },
                {
                    question: "Can this Website be translated to different languages?",
                    answer: "CapaVida is currently available in English and Arabic. We are working on adding more languages as we expand our premises."
                }
            ]
        },
        {
            title: "Pricing & Payment",
            items: [
                {
                    question: "Is this Website free?",
                    answer: "Yes, CapaVida is free and no costs are needed for operation. However, if you have a disability that we don't accommodate in our default mode, we require a $20 fee to personalize your version. If you are unable to pay said fee we are more than happy to refer you to NGOs we have partnered with that can offer assistance. CapaVida premium, which offers dark and light themes, ad-free operation and personalized settings, costs a $20 monthly fee or a $250 yearly fee."
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept OMT and Whish money as our payment methods."
                },
                {
                    question: "Can I split my payment between multiple methods?",
                    answer: "If you happen to want to split the cost between different methods please request permission through our help center."
                }
            ]
        },
        {
            title: "Job Matching & Support",
            items: [
                {
                    question: "How does CapaVida's job matching system work?",
                    answer: "Our AI-powered system analyzes job seekers' skills, interests, and needs to match them with suitable employment opportunities. We also provide training programs to help candidates enhance their employability."
                },
                {
                    question: "How can I reach your customer support team?",
                    answer: "To reach our customer support team, write down your requests, issues, or any feedback in our help center chat box and our team will get back to you via email."
                },
                {
                    question: "How long does it take to receive a response to my inquiry?",
                    answer: "To receive a response to your inquiry, a standard period of one week will take us to respond. If it happens to take longer please don't hesitate to send an email listed at the bottom of our privacy policy."
                }
            ]
        }
    ];

    return (
        <div className="help-container">
            <h1>Help Center</h1>
            <div className="help-content">
                {helpSections.map((section, index) => (
                    <div key={index} className="help-section">
                        <h2>{section.title}</h2>
                        <div className="faq-list">
                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="faq-item">
                                    <h3>{item.question}</h3>
                                    <div className="faq-answer">
                                        {item.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;