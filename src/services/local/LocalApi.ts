class LocalApi {
  getUserCertificationId ():string|null {
    return localStorage.getItem("certificationId");
  }
}

export default new LocalApi();