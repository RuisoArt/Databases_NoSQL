class Product{
    
    public productName: string;
    public productDescription: string;
    public productLink: string;
    public productImage: string;
    public productColor: string;
    public productType: string;
    public productAmount: number;
    public productValue: number;
    public productTax: number;
    public productPrice: number;
    public productDate: Date;

    constructor(name: string, description: string, link: string, img: string, 
        color: string, type: string, amount: number, value: number, tax: number,
        price: number, date: Date){

            this.productName = name;
            this.productDescription = description;
            this.productLink = link;
            this.productImage = img;
            this.productColor = color;
            this.productType = type;
            this.productAmount = amount;
            this.productValue = value;
            this.productTax = tax;
            this.productPrice = price;
            this.productDate = date;
    }
}