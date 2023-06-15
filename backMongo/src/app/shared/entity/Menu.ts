import Product from "./Product";
import Restaurant from "./Restaurant";

class Menu{

    public codMenu: string;
    public menuName: string;
    public codRestaurant: Restaurant;
    public menuProduct: Product[];

    constructor(cod: string, nom: string, codR: Restaurant, prod: Product[]){

        this.codMenu = cod;
        this.menuName = nom;
        this.codRestaurant = codR;
        this.menuProduct = prod;

    }

}


export default Menu;