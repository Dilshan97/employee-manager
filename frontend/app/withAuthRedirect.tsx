import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuthRedirect = (props: any) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
      if (token) {
        router.replace('/system-user');
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
