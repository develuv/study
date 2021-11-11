export const numberWithCommas = (x: string | number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPhoneNumber = (tel: string): string => {
  if (tel.length === 11) {
    return tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (tel.length === 12) {
    return tel.replace(/(\d{3})(\d{5})(\d{4})/, '$1-$2-$3');
  }
  return tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};

export const formatSafetyPhoneNumber = (tel: string, shouldDestroy: boolean): string => {
  if (tel) {
    return shouldDestroy ? `050-****-****` : formatPhoneNumber(tel);
  }
  return '';
};

export const formatPrice = (num: string | number): string => num.toString().replace(/.(?=(?:.{3})+$)/g, '$&,');
