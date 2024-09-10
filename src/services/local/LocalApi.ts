class LocalApi {
  getUserCertificationId ():string|null {
    return localStorage.getItem("certificationId");
  }
  removeCertification ():void {
    localStorage.removeItem("certificationId");
  }

}

export default new LocalApi();