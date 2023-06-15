class CopyCity{
    public cityName: string;
    public publicName: string;
    public privateName: string;
    public status: number;
    
    public base64City: string;

    constructor(cityName: string, publicName: string, privateName: string, status: number, base64City: string){
        this.cityName = cityName;
        this.publicName = publicName;
        this.privateName = privateName;
        this.status = status;
        this.base64City = base64City;
    }
}
export default CopyCity;