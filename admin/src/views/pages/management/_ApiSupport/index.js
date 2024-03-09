import axios from 'axios';

// const apiNodeSupport = () => 'http://localhost:7171'
const apiNodeSupport = () => 'http://45.119.213.248:7171'

const getSupportLink = async () => {
    let phone = ''
    await axios.get(apiNodeSupport() + '/contacts').then(response => { phone = response.data[0].phone; })
    return phone
}

const updatePhoneNumber = async (phone) => {
    try {
        const params = new URLSearchParams();
        params.append('phone', phone);

        const response = await axios.post(
            apiNodeSupport() + '/contacts',
            params.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        return response.status === 200 ? 1 : 0;
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return 0;
    }
};

const getWithDrawPassworkUser = async (userName) => {
    try {
        if (userName.length < 1) return null
        const response = await axios.get(`${apiNodeSupport()}/get-withdrawPassword-user?userName=${userName}`);
        return response.data.WithdrawPassword || null
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return null;
    }
};

const setWithDrawPassworkUser = async (userName, withdrawPassword) => {
    try {
        try {
            const params = new URLSearchParams();
            params.append('userName', userName);
            params.append('withdrawPassword', withdrawPassword);

            const response = await axios.post(
                apiNodeSupport() + '/set-withdrawPassword-user',
                params.toString(),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            return response.status === 200 ? 1 : 0;
        } catch (error) {
            return 0
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return null;
    }
};

export default {
    getSupportLink,
    updatePhoneNumber,
    getWithDrawPassworkUser,
    setWithDrawPassworkUser,
}