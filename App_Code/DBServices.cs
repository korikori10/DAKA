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
        //
        // TODO: Add constructor logic here
        //
    }
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
                e.Active = Convert.ToBoolean(dr["active"]);

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

    //--------------------------------------------------------------------
    // insert an Employee
    //--------------------------------------------------------------------
    public int insert(Employee emp)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("productNDBConnectionString"); // create the connection
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
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildInsertCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}' ,'{2}', {3}, {4}, '{5}')", emp.CategoryId, emp.Title, emp.ImagePath, emp.Price, emp.Inventory, emp.Active);
        String prefix = "INSERT INTO productN " + "(category_id, title, img_url, price, inventory, active) ";
        command = prefix + sb.ToString();

        return command;
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
    //--------------------------------------------------------------------
    // Update Employee
    //--------------------------------------------------------------------
    public int update(Employee emp)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("productNDBConnectionString"); // create the connection
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
    // Build the Insert a category command String
    //--------------------------------------------------------------------
    private String BuildUpdateCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE productN SET inventory = " + emp.Inventory + " Where product_id = " + emp.ProductId;
        command = prefix;

        return command;
    }
}