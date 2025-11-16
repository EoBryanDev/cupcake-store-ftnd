"use client"
import { useState, useEffect } from 'react';

function useCookie(name: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document?.cookie?.split('; ');
      if (!cookies) return null;

      const cookie = cookies?.find(c => c.startsWith(name + '='));
      if (!cookie) return null;

      const cookieValue = cookie.split('=')[1];
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    };
    const cookie = getCookie(name)
    if (cookie) {
      setValue(cookie);
    } else {
      setValue(null);
    }
  }, [name]);

  return value;
}
export { useCookie }