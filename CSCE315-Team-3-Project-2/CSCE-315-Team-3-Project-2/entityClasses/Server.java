package entityClasses;
// Priyanka Rao worked on this

public class Server{
    public int Server_ID;
    public String Name;
    public int Hours_Worked;
    public double Hourly_Pay;
    public int Num_Orders;

    public Server(int S_ID, String S_Name, int S_HoursWorked, double S_HourlyPay, int num_orders){
        this.Server_ID = S_ID;
        this.Name = S_Name;
        this.Hours_Worked = S_HoursWorked;
        this.Hourly_Pay = S_HourlyPay;
        this.Num_Orders = num_orders;
    }   
}