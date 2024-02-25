'use client';
import { useState } from 'react';

// next.js
import { useRouter } from 'next/navigation';

// primereact
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Dialog } from 'primereact/dialog';

// project import
import { setAuthState } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/store';

// =======================|| User page ||=======================
const UserPage = ({ params }: { params: { username: string } }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    const handleLogOut = () => {
        setDisplayConfirmation(false);
        // router.push('/auth/login');
        dispatch(setAuthState(false));
    };

    // pop-up footer
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="Không" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text autoFocus />
            <Button type="button" label="Có" icon="pi pi-check" onClick={handleLogOut} text />
        </>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="font-medium text-3xl text-900 mb-3">Thông tin người chơi</div>
                    <div className="text-500 mb-5">Nếu muốn thay đổi thông tin vui lòng liên hệ quản trị viên</div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Họ và tên</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Nguyễn Quốc Đạt</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Username</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{params.username}</div>
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
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Trung tâm Kinh doanh Công nghệ số</div>
                        </li>
                    </ul>
                </div>
                <div className="align-items-center justify-content-center flex">
                    <Button label="Đăng xuất" icon="pi pi-sign-out" severity="secondary" onClick={() => setDisplayConfirmation(true)}></Button>
                    <Dialog header="Xác nhận" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            <span>Bạn có chắc chắn muốn đăng xuất?</span>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
