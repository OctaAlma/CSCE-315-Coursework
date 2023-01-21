import java.sql.*;
import java.util.Scanner;
import java.io.*;
import entityClasses.*;

/*
CSCE 315
9-27-2021 Lab
 */
public class jdbcpostgreSQL {

  //Commands to run this script
  //This will compile all java files in this directory
  //javac *.java
  //This command tells the file where to find the postgres jar which it needs to execute postgres commands, then executes the code
  //Windows: java -cp ".;postgresql-42.2.8.jar" jdbcpostgreSQL
  //Mac/Linux: java -cp ".:postgresql-42.2.8.jar" jdbcpostgreSQL

  //MAKE SURE YOU ARE ON VPN or TAMU WIFI TO ACCESS DATABASE
  static String managerCSV = "managers.csv";
  static String serverCSV = "servers.csv";
  static String orderCSV = "orders.csv";
  static String menuCSV = "menu.csv";
  static String inventoryCSV = "inventory.csv";

  public static void main(String args[]) {

    //Building the connection with your credentials
    Connection conn = null;
    String teamNumber = "3";
    String sectionNumber = "910";
    String dbName = "csce315_" + sectionNumber + "_" + teamNumber;
    String dbConnectionString = "jdbc:postgresql://csce-315-db.engr.tamu.edu/" + dbName;
    dbSetup myCredentials = new dbSetup(); 

    //Connecting to the database
    try {
      conn = DriverManager.getConnection(dbConnectionString, dbSetup.user, dbSetup.pswd);
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println(e.getClass().getName()+": "+e.getMessage());
      System.exit(0);
    }

    System.out.println("Opened database successfully");

    try{
      String sqlStatement = "";
      //create a statement object
      Statement stmt = conn.createStatement();

      // Open the file and read in data. Separate the data by commas (csv)


      Scanner a = new Scanner(new File (menuCSV));

      while (a.hasNextLine()){
        System.out.println();
        String line = a.nextLine();
        Scanner sc = new Scanner(line);
        sc.useDelimiter(",");

        while (sc.hasNext()){
          int id = sc.nextInt();                 System.out.print(id  + " ");
          String name = sc.next();               System.out.print(name + " ");
          Double price = sc.nextDouble();        System.out.print(price + " "); 
          int numIngr = sc.nextInt();            System.out.print(numIngr + "\n");
          
          MenuItem menuItem = new MenuItem(id, name, price, numIngr);

          String s = "' {";
          for (int i = 0; i < numIngr; i++){
            menuItem.ingredients[i] = sc.next();
            s = s + " \"" + menuItem.ingredients[i] + "\" ";
            if (i != numIngr-1){
              s = s + ",";
            }
          }
          s = s + "} '";

          menuItem = new MenuItem(id,name,price,numIngr);

          sqlStatement = "INSERT INTO menu_items ( menu_id , item_name , item_price , num_ingredients, ingredient_list ) VALUES( " + menuItem.menuID + " , '" + menuItem.name + "' , " + menuItem.price + " , "+ menuItem.numIngredients + ", " + s + " )";
          
          System.out.println(sqlStatement);
          

          try{
            ResultSet result = stmt.executeQuery(sqlStatement);
            //OUTPUT
            //You will need to output the results differently depeninding on which function you use
            System.out.println("--------------------Query Results--------------------");
            System.out.println(result);
          }catch (Exception e){
            System.err.println(e.getClass().getName()+": "+e.getMessage());
          }
          // In the case of menu items, we need to break due to excesive commas when excel creates the csv file
          break;
        }
        sc.close();
        System.out.println();
      }      

      a.close();

      a = new Scanner(new File(inventoryCSV));

      while (a.hasNextLine()){
        System.out.println();
        String line = a.nextLine();
        Scanner sc = new Scanner(line);
        sc.useDelimiter(",");

        InventoryItem inv;

        while (sc.hasNext()){
          String id = sc.next();         System.out.print(id  + " ");
          double prc = sc.nextDouble();  System.out.print(prc + " ");
          String unt = sc.next();        System.out.print(unt + " "); 
          double qty = sc.nextDouble();        System.out.print(qty + " ");
          double servSize = sc.nextDouble();        System.out.print(servSize + "\n");

          inv = new InventoryItem(id, prc, unt, qty, servSize);

          sqlStatement = "INSERT INTO inventory ( itemid , stockprice, unit, quantity, serving_size ) VALUES( '" + inv.itemID + "' , " + inv.stockPrice + " , '"+ inv.unit + "' , " + inv.Qty + " , " + inv.servingSize  +" )";
          
          System.out.println(sqlStatement);
          
          try{
            ResultSet result = stmt.executeQuery(sqlStatement);
            //OUTPUT
            //You will need to output the results differently depeninding on which function you use
            System.out.println("--------------------Query Results--------------------");
            System.out.println(result);
          }catch (Exception e){
            System.err.println(e.getClass().getName()+": "+e.getMessage());
          }

        }
        sc.close();
        System.out.println();
      }
      a.close();


      // Hannah is adding the order
      a = new Scanner(new File (orderCSV));

      while (a.hasNextLine()){
        System.out.println();
        String line = a.nextLine();
        Scanner sc = new Scanner(line);
        sc.useDelimiter(",");

        while (sc.hasNext()){
          int id = sc.nextInt();                 System.out.print(id  + " ");
          Double price = sc.nextDouble();        System.out.print(price + " "); 
          int item = sc.nextInt();               System.out.print(item + "\n");
          String date = sc.next();               System.out.print(date + " ");
          String day = sc.next();                System.out.print(day + " ");
          
          Order order = new Order(id, price, day, date, item);

          sqlStatement = "INSERT INTO orders ( order_id , order_total , item, date_made, day_made ) VALUES( " + order.orderID + " , " + order.totalPrice + " , " + order.item + " , '" + order.date + "' , '"+ order.day + "' )";
          
          System.out.println(sqlStatement);
          

          try{
            ResultSet result = stmt.executeQuery(sqlStatement);
            //OUTPUT
            //You will need to output the results differently depeninding on which function you use
            System.out.println("--------------------Query Results--------------------");
            System.out.println(result);
          }catch (Exception e){
            System.err.println(e.getClass().getName()+": "+e.getMessage());
          }

        }
        sc.close();
        System.out.println();
      }      

      a.close();


      //manager
      a = new Scanner(new File (managerCSV));

      while (a.hasNextLine()){
        System.out.println();
        String line = a.nextLine();
        Scanner sc = new Scanner(line);
        sc.useDelimiter(",");

        while (sc.hasNext()){
          int id = sc.nextInt();                 System.out.print(id  + " ");
          String name = sc.next();               System.out.print(name + " ");
          double salary = sc.nextInt();            System.out.print(salary + "\n");
          
          Manager man = new Manager(id, name, salary);

          sqlStatement = "INSERT INTO managers (manager_id, name, salary) VALUES( " + man.managerID + " , '" + man.name + "' , " + man.salary + " )";
          
          System.out.println(sqlStatement);
          

          try{
            ResultSet result = stmt.executeQuery(sqlStatement);
            //OUTPUT
            //You will need to output the results differently depeninding on which function you use
            System.out.println("--------------------Query Results--------------------");
            System.out.println(result);
          }catch (Exception e){
            System.err.println(e.getClass().getName()+": "+e.getMessage());
          }

        }
        sc.close();
        System.out.println();
      }      

      a.close();


      //server
      a = new Scanner(new File (serverCSV));

      while (a.hasNextLine()){
        System.out.println();
        String line = a.nextLine();
        Scanner sc = new Scanner(line);
        sc.useDelimiter(",");

        while (sc.hasNext()){
          int server_id = sc.nextInt();          System.out.print(server_id  + " ");
          String server_name = sc.next();        System.out.print(server_name + " ");
          int hours_worked = sc.nextInt();       System.out.print(hours_worked + " "); 
          double hourly_pay = sc.nextDouble();   System.out.print(hourly_pay + " ");
          int numOrders = sc.nextInt();          System.out.print(numOrders + "\n");
          
          Server server = new Server(server_id, server_name, hours_worked, hourly_pay, numOrders);

          sqlStatement = "INSERT INTO servers (server_id , full_name , hours_worked , hourly_pay , num_orders ) VALUES( " + server.Server_ID + " , '" + server.Name + "' , " + server.Hours_Worked + " , "+ server.Hourly_Pay + ", " + server.Num_Orders + " )";
          
          System.out.println(sqlStatement);
          

          try{
            ResultSet result = stmt.executeQuery(sqlStatement);
            //OUTPUT
            //You will need to output the results differently depeninding on which function you use
            System.out.println("--------------------Query Results--------------------");
            System.out.println(result);
          }catch (Exception e){
            System.err.println(e.getClass().getName()+": "+e.getMessage());
          }

        }
        sc.close();
        System.out.println();
      }      

      a.close();

      //Running a query
      //TODO: update the sql command here
      //String sqlStatement = "INSERT INTO teammembers (student_name , section , favorite_movie, favorite_holiday ) VALUES('Tomas', 912, 'Morbius', '2022-09-21')";

      //send statement to DBMS
      //This executeQuery command is useful for data retrieval
      //OR
      //This executeUpdate command is useful for updating data
      //int result = stmt.executeUpdate(sqlStatement);
    } catch (Exception e){
        e.printStackTrace();
        System.err.println(e.getClass().getName()+": "+e.getMessage());
        System.exit(0);
    }

    //closing the connection
    try {
    conn.close();
    System.out.println("Connection Closed.");
    } catch(Exception e) {
      System.out.println("Connection NOT Closed.");
    }//end try catch
  }//end main
}//end Class
