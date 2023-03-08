import { Navigate, Outlet } from 'react-router';

interface IProps {
    condition: boolean;
    redirectionPath: string;
}

export default function AppRoute({ condition, redirectionPath }: IProps) {
    return condition ? <Outlet /> : <Navigate to={redirectionPath ?? ''} />;
}
