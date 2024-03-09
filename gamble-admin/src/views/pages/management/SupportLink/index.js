import React, { useState, useEffect } from 'react';
import apiSupport from "../_ApiSupport";
import toast from "@services/toast"
const SupportLink = () => {
    const [phoneDefault, setPhoneDefault] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const defaultPhone = await apiSupport.getSupportLink();
                setPhoneDefault(defaultPhone);
            } catch (error) {
                console.error('Lỗi khi lấy số điện thoại mặc định:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = async () => {
        try {
            const phoneNew = document.getElementById('phoneNumber').value;
            const savePhone = await apiSupport.updatePhoneNumber(phoneNew);
            if (savePhone > 0) {
                toast.sucess('Cập nhật thành công')
            } else {
                toast.error('Cập nhật thành công')
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số điện thoại:', error);
        }
    };

    const handleChange = (event) => {
        setPhoneDefault(event.target.value);
    };

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Thay đổi số điện thoại hỗ trợ</label>
                <input
                    type="text"
                    id="phoneNumber"
                    className="mb-3 form-control"
                    value={phoneDefault}
                    onChange={handleChange}
                />
                <button type="button" className="btn btn-primary" onClick={handleClick}>Lưu</button>
            </div>
        </div>
    );
}

export default SupportLink;
