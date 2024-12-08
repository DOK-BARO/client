class LocalApi {
  getUserCertificationId ():string|null {
    return localStorage.getItem("certificationId");
  }
  removeCertification ():void {
    localStorage.removeItem("certificationId");
  }
	removeAll ():void{
		localStorage.clear();
	}

}

export default new LocalApi();