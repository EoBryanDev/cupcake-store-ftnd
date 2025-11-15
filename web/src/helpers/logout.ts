import { useSession } from "../hooks/useSession";

const removeCookie = (cookieName: string = 'user'): void => {
  // Remove o cookie setando expiração no passado
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const logout = (redirectTo?: string) => {
  const userSession = useSession("user");
  userSession.remove();
  removeCookie('ck-store-key');

  if (redirectTo) {
    window.location.href = redirectTo;
  } else {
    // Recarrega a página para limpar o estado
    window.location.reload();
  }
}
export { logout }