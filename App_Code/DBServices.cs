using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;

/// <summary>
/// Summary description for DBServices
/// </summary>
public class DBServices
{

    public SqlDataAdapter da;
    public DataTable dt;
    private string table;
    private string name;
    private string nameDS;
    public DBServices()
    {
       
    }

    #region connection and Createcommand
    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }
    #endregion


    #region SELECT COMMANDs
   
    /// <summary>
    /// reads employees from sql
    /// </summary>
    /// <returns>list of employees</returns>
    public List<Employee> readEmployees()
    {

        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM EMPLOYEE";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Employee e = new Employee();
                e.Employee_pass_id = dr["employee_pass_id"].ToString();
                e.Lname = dr["lname"].ToString();
                e.Fname = dr["fname"].ToString();
                e.Birthday =Convert.ToDateTime( dr["birthday"]);
                e.Gender = Convert.ToBoolean(dr["gender"]);
                e.Picture = dr["Picture"].ToString();
                e.Origin_country =Convert.ToInt16(dr["origin_country"]);
                e.Il_citizen = Convert.ToBoolean(dr["il_citizen"]);
                e.Add_city= Convert.ToInt16(dr["add_city"]);
                e.Add = dr["add"].ToString();
                e.Add_num= Convert.ToInt16(dr["add_num"]);
                e.Phone= Convert.ToInt16(dr["phone"]);
                e.Com_app = Convert.ToBoolean(dr["com_app"]);
                e.Sys_id = Convert.ToInt16(dr["michpal_id"]);
                e.Insurance = Convert.ToBoolean(dr["insurance"]); 
                e.Com_insurance = Convert.ToBoolean(dr["com_insurance"]);
                e.Fam_stat_code = Convert.ToInt16(dr["fam_stat_code"]); 
                e.Salary_hour = Convert.ToInt16(dr["salary_hour"]); 
                e.Salary_overtime = Convert.ToInt16(dr["salary_overtime"]);
                e.Salary_trans= Convert.ToInt16(dr["salary_trans"]);
                e.Day_off = Convert.ToInt16(dr["day_off_id"]);
                e.Sabatical = Convert.ToInt16(dr["sabatical"]);
                e.Occupation_code = Convert.ToInt16(dr["occupation_code"]);
                e.Active = Convert.ToBoolean(dr["active"]);
                e.Disable_reason = dr["disable_reason"].ToString();

                Employees.Add(e);
            }

            return Employees;
        }

        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }


        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }


    }


    /// <summary>
    /// reads employee from sql
    /// </summary>
    /// <returns>employee</returns>
    public Employee ReadEmployee(int emp_pss_id) 
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM EMPLOYEE where employee_pass_id = '" + emp_pss_id + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            Employee Emp = new Employee();
            while (dr.Read())
            {
                Emp = new Employee(dr["employee_pass_id"].ToString(), dr["lname"].ToString(), dr["fname"].ToString(), Convert.ToDateTime(dr["birthday"]), Convert.ToBoolean(dr["gender"]), dr["Picture"].ToString(), Convert.ToInt16(dr["origin_country"]), Convert.ToBoolean(dr["il_citizen"]), Convert.ToInt16(dr["add_city"]), dr["add"].ToString(), Convert.ToInt16(dr["add_num"]), Convert.ToInt16(dr["phone"]), Convert.ToBoolean(dr["com_app"]), Convert.ToInt16(dr["michpal_id"]), Convert.ToBoolean(dr["insurance"]), Convert.ToBoolean(dr["com_insurance"]), Convert.ToInt16(dr["fam_stat_code"]), Convert.ToInt16(dr["salary_hour"]), Convert.ToInt16(dr["salary_overtime"]), Convert.ToInt16(dr["salary_trans"]), Convert.ToInt16(dr["day_off_id"]), Convert.ToInt16(dr["sabatical"]), Convert.ToInt16(dr["occupation_code"]), Convert.ToBoolean(dr["active"]), dr["disable_reason"].ToString());
            }
            return Emp;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    /// <summary>
    /// reads businesses from sql
    /// </summary>
    /// <returns>list of businesses</returns>
    public List<Business> readBusinesses()
    {
        SqlConnection con = null;
        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM BUSINESSES";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Business> businesses = new List<Business>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Business b = new Business();           
                b.Bus_id = Convert.ToInt16(dr["bus_id"]);
                b.Bus_name = dr["bus_name"].ToString();
                b.Add_city = Convert.ToInt16(dr["add_city"]);
                b.Add = dr["add"].ToString();
                b.Add_num = Convert.ToInt16(dr["add_num"]);
                b.Phone = Convert.ToInt16(dr["phone"]);
                b.Bus_type_code = Convert.ToInt16(dr["bus_type_code"]);
                b.Contract_code = Convert.ToInt16(dr["contract_code"]);   
                businesses.Add(b);
            }

            return businesses;
        }

        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }

    /// <summary>
    /// reads business from sql
    /// </summary>
    /// <returns>business</returns>
    public Business ReadBusiness(int bus_id)
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM BUSINESSES where bus_id = '" + bus_id + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            Business Busi = new Business();
            while (dr.Read())
            {
                Busi = new Business(Convert.ToInt16(dr["bus_id"]),dr["bus_name"].ToString(),Convert.ToInt16(dr["add_city"]),dr["add"].ToString(),Convert.ToInt16(dr["add_num"]),Convert.ToInt16(dr["phone"]), Convert.ToInt16(dr["bus_type_code"]),Convert.ToInt16(dr["contract_code"]));
            }
           return Busi;
           
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    /// <summary>
    /// reads Users from sql
    /// </summary>
    /// <returns>list of Users</returns>
    public List<User> readUsers()
    {

        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM USERS";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<User> Users = new List<User>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                User u = new User(); 
            
                u.Uid =Convert.ToInt16(dr["uid"]);
                u.U_name = dr["u_name"].ToString();
                u.U_pwd = dr["u_pwd"].ToString();
                u.Full_name= dr["full_name"].ToString();
                u.U_type_code = Convert.ToInt16(dr["U_type_code"]);
                u.Phone = Convert.ToInt16(dr["phone"]);


               Users.Add(u);
            }

            return Users;
        }

        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }


        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }


    }

    /// <summary>
    /// reads User from sql
    /// </summary>
    /// <returns>User</returns>
    public User ReadUsers(int user_id)
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM USERS where uid = '" + user_id + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            User user = new User();
            while (dr.Read())
            {
                user = new User(Convert.ToInt16(dr["uid"]), dr["u_name"].ToString(), dr["u_pwd"].ToString(), dr["full_name"].ToString(), Convert.ToInt16(dr["U_type_code"]), Convert.ToInt16(dr["phone"]));
            }
            return user;

        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    #endregion



    #region INSERT COMMAND

    //--------------------------------------------------------------------
    // insert an Employee
    //--------------------------------------------------------------------
    public int insert(Employee emp)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(emp);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String for employee
    //--------------------------------------------------------------------
    private String BuildInsertCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}' ,'{2}', {3}, {4},'{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','{18}','{19}','{20}','{21}','{22}','{23}','{24}')", emp.Employee_pass_id, emp.Lname, emp.Fname, emp.Birthday, emp.Gender, emp.Picture, emp.Origin_country, emp.Il_citizen, emp.Add_city, emp.Add, emp.Add_num, emp.Phone, emp.Com_app, emp.Sys_id, emp.Insurance, emp.Com_insurance, emp.Fam_stat_code, emp.Salary_hour, emp.Salary_overtime, emp.Salary_trans, emp.Day_off, emp.Sabatical, emp.Occupation_code, emp.Active, emp.Disable_reason);//לבדוק מה סטרינג כי הוא מצריך גרשיים אחדיים ולאינט לא!לבדוק מי צריך מה לגבי בול והשאר
        String prefix = "INSERT INTO EMPLOYEE " + "(employee_pass_id,lname,fname,birthday,gender,Picture,origin_country,il_citizen,add_city,add,add_num,phone,com_app,michpal_id,insurance,com_insurance,fam_stat_code,salary_hour,salary_overtime,salary_trans,day_off_id,sabatical, occupation_code,active,disable_reason) ";
        command = prefix + sb.ToString();

        return command;
    }

    //--------------------------------------------------------------------
    // insert an Business
    //--------------------------------------------------------------------
    public int insert(Business busi)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(busi);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String for employee
    //--------------------------------------------------------------------
    private String BuildInsertCommand(Business busi)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, '{1}' ,{2}, {3}, {4},{5},{6},{7})", busi.Bus_id, busi.Bus_name, busi.Add_city, busi.Add, busi.Add_num, busi.Phone, busi.Bus_type_code, busi.Contract_code);//לבדוק מה סטרינג כי הוא מצריך גרשיים אחדיים ולאינט לא!לבדוק מי צריך מה לגבי בול והשאר
        String prefix = "INSERT INTO BUSINESSES " + "(bus_id,bus_name,add_city,add,add_num,phone,bus_type_code,contract_code)";
        command = prefix + sb.ToString();

        return command;
    }

    //--------------------------------------------------------------------
    // insert an Business
    //--------------------------------------------------------------------
    public int insert(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(user);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String for employee
    //--------------------------------------------------------------------
    private String BuildInsertCommand(User user)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, '{1}' ,{2}, {3}, {4},{5})", user.Uid, user.U_name, user.U_pwd, user.Full_name, user.U_type_code,user.Phone);//לבדוק מה סטרינג כי הוא מצריך גרשיים אחדיים ולאינט לא!לבדוק מי צריך מה לגבי בול והשאר
        String prefix = "INSERT INTO USERS " + "(uid,u_name,u_pwd,full_name,U_type_code,phone)";
        command = prefix + sb.ToString();

        return command;
    }
    #endregion



    #region UPDATE COMMAND

    //--------------------------------------------------------------------
    // Update Employee
    //--------------------------------------------------------------------
    public int update(Employee emp)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCommand(emp);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    //--------------------------------------------------------------------
    // Build the business a employy command String
    //--------------------------------------------------------------------
    private String BuildUpdateCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        //String prefix = "UPDATE productN SET inventory = " /*+ emp.Inventory + " Where product_id = " + emp.ProductId*/;
        command = "";// prefix;

        return command;
    }

    //--------------------------------------------------------------------
    // Update business
    //--------------------------------------------------------------------
    public int update(Business busi)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCommand(busi);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    //--------------------------------------------------------------------
    // Build the update a business command String
    //--------------------------------------------------------------------
    private String BuildUpdateCommand(Business busi)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        //String prefix = "UPDATE productN SET inventory = " /*+ emp.Inventory + " Where product_id = " + emp.ProductId*/;
        command = "";// prefix;

        return command;
    }


    //--------------------------------------------------------------------
    // Update user
    //--------------------------------------------------------------------
    public int update(User u)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DAKADBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCommand(u);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }


    //--------------------------------------------------------------------
    // Build the update a user command String
    //--------------------------------------------------------------------
    private String BuildUpdateCommand(User u)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        //String prefix = "UPDATE productN SET inventory = " /*+ emp.Inventory + " Where product_id = " + emp.ProductId*/;
        command = "";// prefix;

        return command;
    }
    #endregion
}