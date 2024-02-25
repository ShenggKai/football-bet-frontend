'use client';

// next.js
import { useRouter } from 'next/navigation';

// prime
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

// third party
import { useFormik } from 'formik';
import * as Yup from 'yup';

// type
type FieldName = 'username' | 'password';

// ==================================|| Login Page ||==================================
const LoginPage = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().trim('Không được có khoảng trắng').strict(true).max(255).required('Không được để trống'),
            password: Yup.string().trim('Không được có khoảng trắng').strict(true).max(255).required('Không được để trống')
        }),
        onSubmit: async (values, helpers) => {
            try {
                // await auth.signIn(values.email, values.password);
                router.push('/');
            } catch (err) {
                helpers.setStatus({ success: false });
                // helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    const isFormFieldInvalid = (name: FieldName) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: FieldName) => {
        return (
            isFormFieldInvalid(name) && (
                <div className="mt-1">
                    <small className="p-error">{formik.errors[name]}</small>
                </div>
            )
        );
    };

    // style
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/images/logo.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Trổ Tài Dự Đoán</div>
                            <span className="text-600 font-medium">Đăng nhập để tiếp tục</span>
                        </div>

                        <form noValidate onSubmit={formik.handleSubmit} className="field mt-6">
                            {/* username or email input */}
                            <span className="p-float-label">
                                <InputText
                                    id="username"
                                    type="text"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={classNames('w-full md:w-30rem', { 'p-invalid': isFormFieldInvalid('username') })}
                                    style={{ padding: '1rem' }}
                                />
                                <label htmlFor="username">Username hoặc email</label>
                            </span>
                            {getFormErrorMessage('username')}

                            {/* password input */}
                            <span className="p-float-label mt-5">
                                <Password
                                    inputId="password"
                                    feedback={false}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    toggleMask
                                    className="w-full"
                                    inputClassName={classNames('w-full p-3 md:w-30rem', { 'p-invalid': isFormFieldInvalid('password') })}
                                ></Password>
                                <label htmlFor="password">Password</label>
                            </span>
                            {getFormErrorMessage('password')}

                            {/* forget password button */}
                            <div className="flex align-items-center justify-content-between mb-5 mt-4">
                                <div className="flex align-items-center"></div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Quên mật khẩu?
                                </a>
                            </div>

                            {/* login button */}
                            <Button label="Đăng nhập" className="w-full p-3 text-xl" type="submit"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
