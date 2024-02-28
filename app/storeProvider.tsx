// redux
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

// project import
import { store } from '@/lib/store';

persistStore(store);

// ========================|| Store provider ||========================
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
