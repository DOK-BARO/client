export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  // console.log("value : %o",value);
  const parts = value.split(`; ${name}=`);
  // console.log("parts: %o",parts);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};
