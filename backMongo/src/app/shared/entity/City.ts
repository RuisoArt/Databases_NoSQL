class City{
    public cityName: string;
    public publicName: string;
    public privateName: string;
    public status: number;

    public cityPhotoPublic: string;
    public cityPhotoPrivate: string;
    public codCity: string
    public base64City: string;

    constructor(cityName: string, publicName: string, privateName: string, status: number, base64City: string, PhotoPublic: string, PhotoPrivate: string, cod: string){
        this.cityName = cityName;
        this.publicName = publicName;
        this.privateName = privateName;
        this.status = status;
        this.base64City = base64City;
        this.cityPhotoPrivate = PhotoPrivate;
        this.cityPhotoPublic = PhotoPublic;
        this.codCity = cod;
    }
}
export default City;