import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

// project import
import { store } from '@/lib/store';

persistStore(store);

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
