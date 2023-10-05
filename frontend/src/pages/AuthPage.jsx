import SignupCard from '../components/Signup';
import { useRecoilValue } from 'recoil';
import LoginCard from '../components/Login';
import authScreenAtom from '../atoms/authAtom';

function AuthPage() {
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <div>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</div>
  );
}

export default AuthPage;
