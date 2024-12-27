export function formatDate(
  isoString: string,
  isTextFormat: boolean = false
): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return isTextFormat
    ? `${year}년 ${month}월 ${day}일`
    : `${year}.${month}.${day}`;
}
