export const phoneMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }
  return cleaned.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
};

export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, '$1.$2.$3-$4');
};