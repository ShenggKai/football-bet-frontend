'use client';

import { useState } from 'react';

// primereact
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

// project import
import { setAuthState, clearTokens } from '@/redux/reducers/authSlice';
import { useAppDispatch } from '@/redux/store';
import { ConfirmDialog } from '@/components';

// =======================|| User page ||=======================
const UserPage = ({ params }: { params: { username: string } }) => {
    const dispatch = useAppDispatch();
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const handleLogOut = () => {
        setDisplayConfirmation(false);
        dispatch(clearTokens());
        dispatch(setAuthState(false));
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="font-medium text-3xl text-900 mb-3">Thông tin người chơi</div>
                    <div className="text-500 mb-5">
                        Nếu muốn thay đổi thông tin vui lòng liên hệ quản trị viên
                    </div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Họ và tên</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                Nguyễn Quốc Đạt
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Username</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                {params.username}
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Vai trò</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                <Chip label="Quản trị viên" className="mr-2" />
                                <Chip label="Người chơi" className="mr-2" />
                            </div>
                        </li>

                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Phòng ban</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                Trung tâm Kinh doanh Công nghệ số
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="align-items-center justify-content-center flex">
                    <Button
                        label="Đăng xuất"
                        icon="pi pi-sign-out"
                        severity="secondary"
                        onClick={() => setDisplayConfirmation(true)}
                    ></Button>

                    <ConfirmDialog
                        visible={displayConfirmation}
                        onYes={handleLogOut}
                        onNo={() => setDisplayConfirmation(false)}
                        confirmMessage={<span>Bạn có chắc chắn muốn đăng xuất?</span>}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserPage;
