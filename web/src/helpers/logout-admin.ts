import { useSession } from "../hooks/useSession";

const removeCookie = (cookieName: string = 'ck-store-key-admin'): void => {
  // Remove o cookie setando expiração no passado
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const logoutAdmin = (redirectTo?: string) => {
  const userSession = useSession("user-admin");
  userSession.remove();
  removeCookie('ck-store-key-admin');

  if (redirectTo) {
    window.location.href = redirectTo;
  } else {
    // Recarrega a página para limpar o estado
    window.location.reload();
  }
}
export { logoutAdmin }