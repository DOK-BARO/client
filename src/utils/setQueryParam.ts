// URL 쿼리 파라미터 설정
export const setQueryParam = (paramName: string, paramValue: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(paramName, paramValue);
  return queryParams;
};
