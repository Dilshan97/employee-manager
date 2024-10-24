import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/store/store';

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuthRedirect = (props: any) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
      if (token) {
        router.push('/system-user');
      }
    }, [token, router]);

    if (token) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuthRedirect.displayName = `WithAuthRedirect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuthRedirect;
};

export default withAuthRedirect;
