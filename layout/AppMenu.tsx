import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
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

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
