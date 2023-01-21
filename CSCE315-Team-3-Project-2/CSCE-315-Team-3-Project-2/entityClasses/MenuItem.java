package entityClasses;

public class MenuItem {
    public int menuID;
    public String name;
    public Double price;
    public int numIngredients;
    // There are arrays in PostgreSQL. When creating the table, we can add
    // <attribute Name> <dataType>[]
    public String [] ingredients;

    public MenuItem(int _menuID, String _name, Double _price, int _numIngredients){
        this.menuID = _menuID;
        this.name = _name;
        this.price = _price;
        this.numIngredients = _numIngredients;
        this.ingredients = new String[_numIngredients];
    }    

}
