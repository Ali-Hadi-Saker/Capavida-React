const BASE_URL = 'https://capavida-back-end.onrender.com';

const API = {
    LOGIN : `${BASE_URL}/api/auth/login`,
    REGISTER : `${BASE_URL}/api/auth/register`,

    AVAILABLE_INTERNSHIPS: `${BASE_URL}/api/internship`,
    ENROLLED_INTERNSHIPS: `${BASE_URL}/api/internship/enrolled/me` ,
    WITHDRAW_INTERNSHIPS: (internshipId) => `${BASE_URL}/api/internship/${internshipId}/withdraw`,
    ENROLL_INTERNSHIP: (internshipId) => `${BASE_URL}/api/internship/${internshipId}/enroll`,

    COMMUNIITIES: `${BASE_URL}/api/communities`,

    MARKETPLACE: `${BASE_URL}/api/marketplace`,

    CHATBOT: `${BASE_URL}/api/chatbot`,

}

export default API;