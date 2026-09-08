import AuthPage from './AuthPage'

function LoginPage({ onNavigate }) {
  return <AuthPage onNavigate={onNavigate} initialFocus="login" />
}

export default LoginPage
