"use client"
import { useState, useEffect } from 'react';
import { useSession } from '../hooks/useSession';

function useCookie(name: string) {
  const [value, setValue] = useState<string | null>(null);
  const { remove } = useSession('user')

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split('; ');
      console.log(document.cookie.split('; '));

      const cookie = cookies.find(c => c.startsWith(name + '='));
      return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    };
    const cookie = getCookie(name)
    if (cookie) {
      setValue(cookie);

    } else {
      remove()
    }
  }, [name]);

  return value;
}
export { useCookie }