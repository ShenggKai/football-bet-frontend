'use client';

// PrimeReact
import { Button } from 'primereact/button';

// Next.js
import { useRouter } from 'next/navigation';

// ========================|| Access denied page ||========================
const AccessDeniedPage = () => {
    const router = useRouter();

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background:
                            'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div
                        className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                        style={{ borderRadius: '53px' }}
                    >
                        <h1 className="text-900 font-bold text-5xl mb-2">Truy cập bị từ chối</h1>
                        <div className="text-600 mb-5">Bạn không có quyền truy cập trang này</div>
                        <img
                            src="/images/access-denied.svg"
                            alt="Error"
                            className="mb-5"
                            width="70%"
                        />
                        <Button
                            icon="pi pi-arrow-left"
                            label="Quay lại trang chủ"
                            text
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessDeniedPage;
