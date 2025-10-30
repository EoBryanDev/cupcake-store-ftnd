const newUserSession = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const getUserSession = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error('Erro ao fazer parse do JSON:', error);
        return null;
      }
    }
  }
  return null;
}

const removeUserSession = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}

const useSession = (key: string) => {
  return {
    set: <T>(value: T) => newUserSession(key, value),
    get: <T>() => getUserSession<T>(key),
    remove: () => removeUserSession(key)
  }
}

export { useSession }