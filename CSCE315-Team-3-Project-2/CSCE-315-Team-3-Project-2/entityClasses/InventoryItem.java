package entityClasses;

public class InventoryItem {
    public String itemID = "";
    public Double stockPrice = 0.0;
    public String unit = "";
    public Double Qty = 0.0;
    public Double servingSize = 0.0;

    public InventoryItem(String _itemID, Double _stockPrice, String _unit, Double _qty, Double _servingSize){
        this.itemID = _itemID;
        this.stockPrice = _stockPrice;
        this.unit = _unit;
        this.Qty = _qty;
        this.servingSize = _servingSize;
    }
}
