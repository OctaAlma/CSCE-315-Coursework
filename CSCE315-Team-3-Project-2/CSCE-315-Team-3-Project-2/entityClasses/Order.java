package entityClasses;

public class Order {
    public int orderID = 0;
    public Double totalPrice = 0.0;
    public String day = "";
    public String date = "";
    public int item = 0;

    public Order(int _orderID, Double _totalPrice, String _day, String _date, int _item){
        this.orderID = _orderID;
        this.totalPrice = _totalPrice;
        this.day = _day;
        this.date = _date;
        this.item = _item;
    }
}
