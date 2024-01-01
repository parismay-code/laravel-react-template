import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

import AuthApiService from '@services/api/auth/AuthApiService';

import { setUser } from '@stores/authReducer';
import { useSelector } from '@stores/rootReducer';

function ProtectedLayout() {
    const dispatch = useDispatch();

    const authStore = useSelector((state) => state.auth);

    const authService = new AuthApiService();

    useQuery({
        queryKey: ['auth'],
        queryFn: authService.user,
        onSuccess: (user) => {
            dispatch(setUser(user));
        },
        onError: () => {
            localStorage.removeItem('user');
            window.location.href = '/auth';
        },
        staleTime: 120 * 60 * 1000,
        cacheTime: 120 * 60 * 1000,
        retry: false,
    });

    if (!authStore.user) {
        return <Navigate to="/auth" />;
    }

    return <Outlet />;
}

export default ProtectedLayout;
