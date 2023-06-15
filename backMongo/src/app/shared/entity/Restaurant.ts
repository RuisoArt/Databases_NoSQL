import City from "./City";

class Restaurant{
    public name: string;
    public address: string;
    public phone: string;
    public timetable: string;
    public status: number;
    public detail: string;
    public codCity: City
    
    constructor(name: string, address: string, phone: string, timetable: string, status: number, detail:string, codCity: City) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.timetable = timetable;
        this.status = status;
        this.detail = detail;
        this.codCity = codCity;
    }
}
export default Restaurant;