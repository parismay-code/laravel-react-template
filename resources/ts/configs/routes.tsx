import type { RouteObject } from 'react-router-dom';

import ProtectedLayout from '@components/ProtectedLayout';

const routes: Array<RouteObject> = [
    {
        path: '/auth',
        element: <div>Auth</div>,
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            {
                path: '/',
                element: <div>Home Page</div>,
            },
        ],
    },
];

export default routes;
