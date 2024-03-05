// project import
import { AppMenuItem } from '@/types';
import { useAppSelector } from '@/redux/store';
import { MenuProvider } from '@/layout/context/menucontext';
import AppMenuitem from '@/layout/AppMenuitem';

// ========================|| App menu ||========================
const AppMenu = () => {
    // get user's role
    const roleName = useAppSelector((state) => state.auth.roleName);

    const adminMenu = [
        {
            label: 'QUẢN TRỊ HỆ THỐNG',
            items: [
                { label: 'Người dùng', icon: 'pi pi-fw pi-user-edit', to: '/' },
                { label: 'Mùa giải', icon: 'pi pi-fw pi-globe', to: '/uikit/misc' },
                { label: 'Người chơi mùa giải', icon: 'pi pi-fw pi-users', to: '/uikit/menu' }
            ]
        },
        {
            label: 'TRẬN ĐẤU',
            items: [
                { label: 'Quản lý trận đấu', icon: 'pi pi-fw pi-sitemap', to: '/match/manage' },
                {
                    label: 'Báo cáo',
                    icon: 'pi pi-fw pi-chart-bar',
                    items: [
                        {
                            label: 'Chi tiết trận đấu',
                            icon: 'pi pi-fw pi-chart-line',
                            to: '/match/report-match'
                        },
                        {
                            label: 'Tổng hợp',
                            icon: 'pi pi-fw pi-chart-pie',
                            to: '/match/report'
                        }
                    ]
                }
            ]
        },
        {
            label: 'MINI GAME',
            items: [
                { label: 'Quản lý mini game', icon: 'pi pi-fw pi-star', to: '/minigame/manage' },
                {
                    label: 'Báo cáo',
                    icon: 'pi pi-fw pi-chart-bar',
                    items: [
                        {
                            label: 'Chi tiết mini game',
                            icon: 'pi pi-fw pi-chart-line',
                            to: '/minigame/report-minigame'
                        },
                        {
                            label: 'Tổng hợp',
                            icon: 'pi pi-fw pi-chart-pie',
                            to: '/minigame/report'
                        }
                    ]
                }
            ]
        },
        {
            label: 'KHÁC',
            items: [{ label: 'Hướng dẫn chơi', icon: 'pi pi-fw pi-question', to: '/uikit/misc' }]
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
