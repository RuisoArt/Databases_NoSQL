class Product{
    public productName: string;
    public productDetail: string;
    public productValue: number;
    public productPhotoPublic: string;
    public productPhotoPrivate: string;

    public codProduct: string;
    public bs64Product: string;

    constructor(cod: string, name:string, detail:string, value:number, photoPublic:string, photoPrivate:string, bs64: string){
        this.productName = name;
        this.productValue = value;
        this.productDetail = detail;
        this.productPhotoPublic = photoPublic;
        this.productPhotoPrivate = photoPrivate;
        this.codProduct = cod;
        this.bs64Product = bs64;
    }
}
export default Product;