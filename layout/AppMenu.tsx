// project import
import { useAppSelector } from '@/lib/store';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    // get user's role
    const roleName = useAppSelector((state) => state.auth.roleName);

    const adminMenu = [
        {
            label: 'QUẢN LÝ',
            items: [
                { label: 'Người dùng', icon: 'pi pi-fw pi-user-edit', to: '/' },
                { label: 'Mùa giải', icon: 'pi pi-fw pi-globe', to: '/uikit/misc' },
                { label: 'Trận đấu', icon: 'pi pi-fw pi-star', to: '/uikit/charts' },
                { label: 'Người chơi mùa giải', icon: 'pi pi-fw pi-users', to: '/uikit/menu' }
            ]
        },
        {
            label: 'BÁO CÁO',
            items: [
                { label: 'Số tiền', icon: 'pi pi-fw pi-money-bill', to: '/uikit/input' },
                { label: 'Tỉ lệ thắng', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/table' }
            ]
        }
    ];

    const memberMenu = [
        {
            label: 'Dự đoán',
            items: [
                { label: 'Trận đấu', icon: 'pi pi-fw pi-sitemap', to: '/' },
                { label: 'Mini game', icon: 'pi pi-fw pi-star', to: '/uikit/misc' }
            ]
        },
        {
            label: 'Khác',
            items: [
                {
                    label: 'Hướng dẫn chơi',
                    icon: 'pi pi-fw pi-question',
                    to: '/uikit/input'
                },
                { label: 'Tài khoản', icon: 'pi pi-fw pi-user', to: '/user/member' }
            ]
        }
    ];

    const menuError = [
        {
            label: 'Lỗi',
            items: [
                {
                    label: 'Không có quyền truy cập',
                    icon: 'pi pi-fw pi-times-circle',
                    to: '/auth/login'
                }
            ]
        }
    ];

    // show menu base on user's role
    let appMenu: AppMenuItem[] = [];
    if (roleName === 'admin') appMenu = adminMenu;
    else if (roleName === 'member') appMenu = memberMenu;
    else appMenu = menuError;

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {appMenu.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem item={item} root={true} index={i} key={item.label} />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
