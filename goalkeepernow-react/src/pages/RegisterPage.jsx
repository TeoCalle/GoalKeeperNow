import AuthPage from './AuthPage'

function RegisterPage({ onNavigate }) {
  return <AuthPage onNavigate={onNavigate} initialFocus="registro" />
}

export default RegisterPage
