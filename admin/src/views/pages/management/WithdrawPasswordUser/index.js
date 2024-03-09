import React, { useState } from 'react';
import apiSupport from "../_ApiSupport";
import toast from "@services/toast"

const SupportLink = () => {
    const [userName, setUserName] = useState('');
    const [withDrawPasswordUser, setWithDrawPasswordUser] = useState('');
    const [isDisabled, setIsDisabled] = useState(true); // Đặt mặc định là true

    const handleBlur = async () => {
        try {
            const withdrawPasswordUser = await apiSupport.getWithDrawPassworkUser(document.getElementById("userName").value)
            if (!withdrawPasswordUser) return toast.error("Không tìm thấy người dùng")
            setWithDrawPasswordUser(withdrawPasswordUser)
            setIsDisabled(false)
            toast.sucess("Mật khẩu hiện tại của người dùng. Bạn có thể đổi mới và ấn lưu")
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setIsDisabled(true)
        }
    };

    const handleSetWithdrawPasswordUser = async () => {
        let userName = document.getElementById("userName").value
        let withdrawPassword = document.getElementById("withDrawPassworkUser").value
        const res = await apiSupport.setWithDrawPassworkUser(userName, withdrawPassword)
        if (res < 1) return toast.error("Vui lòng điền các thông tin hợp lệ")
        toast.sucess("Cập nhật lại mật khẩu rút tiền thành công")
        setIsDisabled(true)
    }

    return (
        <div>
            <div className="mb-3 row">
                <div className='col-6'>
                    <label htmlFor="userName" className="form-label">Nhập tên đăng nhập của người dùng</label>
                    <input
                        type="text"
                        id="userName"
                        className="form-control"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={handleBlur}
                    />
                </div>
                <div className='col-6'>
                    <label htmlFor="withDrawPassworkUser" className="form-label">Mật khẩu rút tiền</label>
                    <input
                        type="text"
                        id="withDrawPassworkUser"
                        className="form-control"
                        value={withDrawPasswordUser}
                        disabled={isDisabled}
                        onChange={(e) => setWithDrawPasswordUser(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <button type="button" onClick={handleSetWithdrawPasswordUser} className="btn btn-primary">Lưu</button>
            </div>
        </div>
    );
};

export default SupportLink;

