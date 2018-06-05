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
    /// reads employees  from sql
    /// </summary>
    /// <returns>list of employees </returns>
    public List<Employee> readEmployees()
    {

        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM EMPLOYEE where dbo.EMPLOYEE.active = '1'";
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
                e.Origin_country =Convert.ToInt32(dr["origin_country"]);
                e.Il_citizen = Convert.ToBoolean(dr["il_citizen"]);
                e.Add_city= Convert.ToInt32(dr["add_city"]);
                e.Add = dr["add"].ToString();
                e.Add_num= Convert.ToInt32(dr["add_num"]);
                e.Phone= Convert.ToInt32(dr["phone"]);
                e.Com_app = Convert.ToBoolean(dr["com_app"]);
                e.Sys_id = Convert.ToInt32(GetString(dr["michpal_id"]));
                e.Insurance = Convert.ToBoolean(dr["insurance"]); 
                e.Com_insurance = Convert.ToBoolean(dr["com_insurance"]);
                e.Fam_stat_code = Convert.ToInt32(dr["fam_stat_code"]); 
                e.Salary_hour = Convert.ToInt32(dr["salary_hour"]); 
                e.Salary_overtime = Convert.ToInt32(dr["salary_overtime"]);
                e.Salary_trans= Convert.ToInt32(dr["salary_trans"]);
                e.Day_off = Convert.ToInt32(dr["day_off_id"]);
                e.Sabatical = Convert.ToInt32(dr["sabatical"]);
                e.Occupation_code = Convert.ToInt32(dr["occupation_code"]);
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
    /// reads employees  from sql
    /// </summary>
    /// <returns>list of employees </returns>
    public List<Employee> getArchive()
    {

        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM EMPLOYEE where dbo.EMPLOYEE.active = '0'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();

            while (dr.Read())
            {   // Read till the end of the data into a row
                Employee e = new Employee();
                e.Employee_pass_id = dr["employee_pass_id"].ToString();
                e.Lname = dr["lname"].ToString();
                e.Fname = dr["fname"].ToString();
                e.Birthday = Convert.ToDateTime(dr["birthday"]);
                e.Gender = Convert.ToBoolean(dr["gender"]);
                e.Picture = dr["Picture"].ToString();
                e.Origin_country = Convert.ToInt32(dr["origin_country"]);
                e.Il_citizen = Convert.ToBoolean(dr["il_citizen"]);
                e.Add_city = Convert.ToInt32(dr["add_city"]);
                e.Add = dr["add"].ToString();
                e.Add_num = Convert.ToInt32(dr["add_num"]);
                e.Phone = Convert.ToInt32(dr["phone"]);
                e.Com_app = Convert.ToBoolean(dr["com_app"]);
                e.Sys_id = Convert.ToInt32(GetString(dr["michpal_id"]));
                e.Insurance = Convert.ToBoolean(dr["insurance"]);
                e.Com_insurance = Convert.ToBoolean(dr["com_insurance"]);
                e.Fam_stat_code = Convert.ToInt32(dr["fam_stat_code"]);
                e.Salary_hour = Convert.ToInt32(dr["salary_hour"]);
                e.Salary_overtime = Convert.ToInt32(dr["salary_overtime"]);
                e.Salary_trans = Convert.ToInt32(dr["salary_trans"]);
                e.Day_off = Convert.ToInt32(dr["day_off_id"]);
                e.Sabatical = Convert.ToInt32(dr["sabatical"]);
                e.Occupation_code = Convert.ToInt32(dr["occupation_code"]);
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
    /// Handles DBnull Exception------>להכניס לEX
    /// </summary>
    private static object GetString(object o)

    {

        if (o == DBNull.Value)
        {
            return o = "0";
        }
        return o;

    }

    /// <summary>
    /// reads employee from sql
    /// </summary>
    /// <returns>employee</returns>
    public Employee ReadEmployee(string emp_pss_id) 
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM fullEmp where employee_pass_id = '" + emp_pss_id + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            Employee Emp = new Employee();
            while (dr.Read())
            {
                Emp = new Employee(dr["employee_pass_id"].ToString(), dr["lname"].ToString(), dr["fname"].ToString(), Convert.ToDateTime(dr["birthday"]), Convert.ToBoolean(dr["gender"]), dr["Picture"].ToString(), Convert.ToInt32(GetString(dr["origin_country"])), Convert.ToBoolean(dr["il_citizen"]), Convert.ToInt32(GetString(dr["add_city"])), dr["add"].ToString(), Convert.ToInt32(GetString(dr["add_num"])), Convert.ToInt32(GetString(dr["phone"])), Convert.ToBoolean(dr["com_app"]), Convert.ToInt32(GetString(dr["michpal_id"])), Convert.ToBoolean(dr["insurance"]), Convert.ToBoolean(dr["com_insurance"]), Convert.ToInt32(GetString(dr["fam_stat_code"])), Convert.ToInt32(GetString(dr["salary_hour"])), Convert.ToInt32(GetString(dr["salary_overtime"])), Convert.ToInt32(GetString(dr["salary_trans"])), Convert.ToInt32(GetString(dr["day_off_id"])), Convert.ToInt32(GetString(dr["sabatical"])), Convert.ToInt32(GetString(dr["occupation_code"])), Convert.ToBoolean(dr["active"]), dr["disable_reason"].ToString(), Convert.ToInt32(GetString(dr["monthly_rent"])), Convert.ToInt32(GetString(dr["bus_id"])));
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
    /// reads history of employee from sql
    /// </summary>
    /// <returns>employee</returns>
    public List<Employee> ReadHistory(string pass)
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM history where employee_pass_id = '" + pass + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            while (dr.Read())
            {
                Employee e = new Employee();
                e.Employee_pass_id = dr["employee_pass_id"].ToString();
                e.Lname = dr["lname"].ToString();
                e.Fname = dr["fname"].ToString();
                e.Bus_name = dr["bus_name"].ToString();
                e.Start_date = Convert.ToDateTime(dr["start_date"]);
                e.End_date = Convert.ToDateTime(dr["end_date"]);
                Employees.Add(e);
            }
            return Employees;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);

        }
    }
    public List<Country> readCountries()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM Country ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Country> countries = new List<Country>();
            while (dr.Read())
            {

                Country country = new Country();
                country.Id = Convert.ToInt32(dr["ID"]);
                country.Name = dr["CountryName"].ToString();
                country.Country_code = dr["country_code"].ToString();



                countries.Add(country);
            }
            return countries;
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
    /// Gets all deparments from DB
    /// </summary>
    /// <returns></returns>
    public List<Department> readDepartments()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM DEPARTMENT_TYPE ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Department> deps = new List<Department>();
            while (dr.Read())
            {

                Department dep = new Department();
                dep.Id = Convert.ToInt32(dr["department_code"]);
                dep.Name = dr["department_name"].ToString();
                



                deps.Add(dep);
            }
            return deps;
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
    /// Gets all business types from DB
    /// </summary>
    /// <returns></returns>
    public List<Business> readTypes()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM [BUSINESS TYPE] ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Business> deps = new List<Business>();
            while (dr.Read())
            {

                Business type = new Business();
                type.Bus_type_code = Convert.ToInt32(dr["bus_type_code"]);
                type.Bus_type_name = dr["bus_type_name"].ToString();




                deps.Add(type);
            }
            return deps;
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
    /// reads cities from sql
    /// </summary>
    /// <returns>list of cities</returns>



    public List<City> readCities()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM CITY ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<City> cities = new List<City>();
            while (dr.Read())
            {

                City city = new City();
                city.Id = Convert.ToInt32(dr["ID"]);
                city.Name = dr["CITYName"].ToString();


                cities.Add(city);
            }
            return cities;
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
            string selectSTR = "SELECT*FROM v_businessTable";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Business> businesses = new List<Business>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Business b = new Business();
                b.Bus_id = Convert.ToInt32(dr["bus_id"]);
                b.Bus_name = dr["bus_name"].ToString();
                b.Add_city = Convert.ToInt32(dr["add_city"]);
                b.Add = dr["add"].ToString();
                b.Add_num = Convert.ToInt32(dr["add_num"]);
                b.Phone = Convert.ToInt32(dr["phone"]);
                b.Bus_type_code = Convert.ToInt32(dr["bus_type_code"]);
                b.Contract_code = Convert.ToInt32(dr["contract_code"]);
                b.Department_code= Convert.ToInt32(dr["department_code"]); ;
                b.Department_name= dr["department_name"].ToString(); 
                b.Bus_type_name= dr["bus_type_name"].ToString();
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
    /// reads contacts from sql
    /// </summary>
    /// <returns>list of contacts</returns>
    public List<Contact> readContacts()
    {
        SqlConnection con = null;
        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_contacts";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Contact> contacts = new List<Contact>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Contact b = new Contact();
                b.Bus_id = Convert.ToInt32(dr["bus_id"]);
                b.Contact_name = dr["contact_name"].ToString();
                b.Email = dr["email"].ToString();
                b.Contact_id = Convert.ToInt32(dr["contact_id"]);
                b.Role_name = dr["role_name"].ToString(); 
                b.Phone = Convert.ToInt32(dr["phone"]);
                b.Role_id = Convert.ToInt32(dr["role_id"]);
                b.Role_desc = dr["role_desc"].ToString();
                contacts.Add(b);
            }

            return contacts;
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
    /// reads employees without business from sql
    /// </summary>
    /// <returns>list of employees</returns>
    public List<Employee> readEmployeesNoBusiness()
    {

        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_emp_no_busi_dash";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Employee e = new Employee();
                e.Employee_pass_id = dr["employee_pass_id"].ToString();
                e.Lname = dr["lname"].ToString();
                e.Fname = dr["fname"].ToString();
                e.Phone = Convert.ToInt32(GetString( dr["phone"]));
                e.Sys_id = Convert.ToInt32(GetString(dr["michpal_id"]));
                e.Bus_name = dr["bus_name"].ToString();
                e.Dayspass= Convert.ToInt32(GetString( dr["daysPass"]));
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
    /// reads employee no systemid from sql
    /// </summary>
    /// <returns>list of employees no system id</returns>
    public List<Employee> ReadEmployeesNoInsu()
    {
        SqlConnection con = null;

        try
        {
           
            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_newEmp";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            while (dr.Read())
            {
                Employee Emp = new Employee();
                Emp = new Employee(dr["employee_pass_id"].ToString(), dr["lname"].ToString(), dr["fname"].ToString(),  Convert.ToInt32(GetString(dr["michpal_id"])), dr["bus_name"].ToString() , Convert.ToBoolean(dr["insurance"]), Convert.ToBoolean(dr["il_citizen"]), Convert.ToBoolean(dr["active"]));
                Employees.Add(Emp);
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
    /// reads employee no updated visa from today
    /// </summary>
    /// <returns>list of employeesno updated visa from today</returns>
    public List<Employee> ReadEmployeesNeedNewVisa()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_ex_visa_date";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            List<Doc> docs = new List<Doc>();

            while (dr.Read())
            {
                Employee Emp = new Employee();
               // Doc c = new Doc();
                //c = new Doc( dr["doc_id"].ToString(),Convert.ToInt32(dr["doctype_id"]), dr["img_url"].ToString(),Convert.ToDateTime( dr["last_update"]), Convert.ToDateTime(dr["ex_date"]), Convert.ToBoolean(dr["active"]));
                Emp = new Employee(dr["employee_pass_id"].ToString(), dr["lname"].ToString(), dr["fname"].ToString(), Convert.ToInt32(GetString(dr["michpal_id"])), Convert.ToDateTime(dr["ex_date"]), Convert.ToInt32(dr["phone"]));
                Employees.Add(Emp);
                //docs.Add(c);
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
    /// reads employee not active
    /// </summary>
    /// <returns>list of employees not active</returns>
    public List<Employee> ReadEmployeesNotActive()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_emp_not_active";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Employee> Employees = new List<Employee>();
            while (dr.Read())
            {
                Employee Emp;
                Emp = new Employee(dr["employee_pass_id"].ToString(), dr["lname"].ToString(), dr["fname"].ToString(), Convert.ToInt32(GetString(dr["michpal_id"])), Convert.ToDateTime(dr["ex_date"]), Convert.ToInt32(dr["phone"]),dr["d_name"].ToString(),dr["bus_name"].ToString());
                Employees.Add(Emp);
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

    public List<Contact> readRoles()
    {
        SqlConnection con = null;

        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM [ROLES OF CONTACTS] ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Contact> Roles = new List<Contact>();
            while (dr.Read())
            {

                Contact role = new Contact();
                role.Role_id = Convert.ToInt32(dr["role_id"]);
                role.Role_name = dr["role_name"].ToString();
                role.Role_desc = dr["role_desc"].ToString();



                Roles.Add(role);
            }
            return Roles;
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
    //public List<Business> readBusinesses()
    //{
    //    SqlConnection con = null;
    //    try
    //    {

    //        con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
    //        string selectSTR = "SELECT*FROM BUSINESSES";
    //        SqlCommand cmd = new SqlCommand(selectSTR, con);
    //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
    //        List<Business> businesses = new List<Business>();
    //        while (dr.Read())
    //        {   // Read till the end of the data into a row
    //            Business b = new Business();           
    //            b.Bus_id = Convert.ToInt32(dr["bus_id"]);
    //            b.Bus_name = dr["bus_name"].ToString();
    //            b.Add_city = Convert.ToInt32(dr["add_city"]);
    //            b.Add = dr["add"].ToString();
    //            b.Add_num = Convert.ToInt32(dr["add_num"]);
    //            b.Phone = Convert.ToInt32(dr["phone"]);
    //            b.Bus_type_code = Convert.ToInt32(dr["bus_type_code"]);
    //            b.Contract_code = Convert.ToInt32(dr["contract_code"]);   
    //            businesses.Add(b);
    //        }

    //        return businesses;
    //    }

    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);

    //    }
    //    finally
    //    {
    //        if (con != null)
    //        {
    //            con.Close();
    //        }
    //    }
    //}

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
                Busi = new Business(Convert.ToInt32(dr["bus_id"]),dr["bus_name"].ToString(),Convert.ToInt32(dr["add_city"]),dr["add"].ToString(),Convert.ToInt32(dr["add_num"]),Convert.ToInt32(dr["phone"]), Convert.ToInt32(dr["bus_type_code"]),Convert.ToInt32(dr["contract_code"]));
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
            
                u.Uid =Convert.ToInt32(dr["uid"]);
                u.U_name = dr["u_name"].ToString();
                u.U_pwd = dr["u_pwd"].ToString();
                u.Full_name= dr["full_name"].ToString();
                u.U_type_code = Convert.ToInt32(dr["U_type_code"]);
                u.Phone = Convert.ToInt32(dr["phone"]);


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
                user = new User(Convert.ToInt32(dr["uid"]), dr["u_name"].ToString(), dr["u_pwd"].ToString(), dr["full_name"].ToString(), Convert.ToInt32(dr["U_type_code"]), Convert.ToInt32(dr["phone"]));
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


    /// <summary>
    /// reads disable reason from sql
    /// </summary>
    /// <returns>list of disable reason</returns>
    public List<Disable_Reason> getDisable()
    {
        SqlConnection con = null;
        try
        {

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM DISABLE_REASON";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Disable_Reason> Reasons = new List<Disable_Reason>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Disable_Reason d = new Disable_Reason();
                d.Did = Convert.ToInt32(dr["did"]);
                d.D_name = dr["d_name"].ToString();

                Reasons.Add(d);
            }

            return Reasons;
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
    //statistics
    public int[] ReadTotalnewemp() {
        SqlConnection con = null;

        try
        {
          // int total , grandtotal ;
            int[] arr = new int[2] ; 

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_s_totalNew";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            User user = new User();
            while (dr.Read())
            {
                arr[0] = Convert.ToInt32(dr["total_new_emp"]);
                arr[1] = Convert.ToInt32(dr["Total_Employees"]);
            }

            return arr;

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
    public int[] ReadTotalAllemp()
    {
        SqlConnection con = null;

        try
        {
            // int total , grandtotal ;
            int[] arr = new int[4];

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_all_statistics";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            User user = new User();
            while (dr.Read())
            {
                arr[0] = Convert.ToInt32(dr["Total_Employees"]);
                arr[2] = Convert.ToInt32(dr["total_active_emp"]);
                arr[1] = Convert.ToInt32(dr["total_new_emp"]);
                arr[3] = Convert.ToInt32(dr["Total_leaving_emp"]);

            }

            return arr;

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

    public int[] ReadEmpByYearStatistics()
    {
        SqlConnection con = null;

        try
        {
            // int total , grandtotal ;
            int[] arr = new int[4];

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_growth_by_years_on_emp";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            User user = new User();
            while (dr.Read())
            {
                arr[0] = Convert.ToInt32(dr["2016"]);
                arr[1] = Convert.ToInt32(dr["2017"]);
                arr[2] = Convert.ToInt32(dr["2018"]);

            }

            return arr;

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

    public int[] ReadEmpByMonthStatistics()
    {
        SqlConnection con = null;

        try
        {
            
            int[] arr = new int[12];

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM v_growth_by_months_on_emp";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {
                arr[0] = Convert.ToInt32(dr["Junuary"]);
                arr[1] = Convert.ToInt32(dr["February"]);
                arr[2] = Convert.ToInt32(dr["March"]);
                arr[3] = Convert.ToInt32(dr["April"]);
                arr[4] = Convert.ToInt32(dr["May"]);
                arr[5] = Convert.ToInt32(dr["June"]);
                arr[6] = Convert.ToInt32(dr["July"]);
                arr[7] = Convert.ToInt32(dr["August"]);
                arr[8] = Convert.ToInt32(dr["September"]);
                arr[9] = Convert.ToInt32(dr["October"]);
                arr[10] = Convert.ToInt32(dr["November"]);
                arr[11] = Convert.ToInt32(dr["December"]);

            }

            return arr;

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

    public Dictionary<int,int> ReadBusiByYearStatistics()
    {
        SqlConnection con = null;

        try
        {
            Dictionary<int, int> arr = new Dictionary<int, int>();
            // int total , grandtotal ;
            //List<> Employees = new List<Employee>();

            con = connect("DAKADBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            string selectSTR = "SELECT*FROM V_business_yearly_growth";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {
                arr.Add (Convert.ToInt32(dr["Year"]), Convert.ToInt32(dr["business Count"]));
               
            }

            return arr;

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
        sb.AppendFormat("Values('{0}', '{1}' ,'{2}', {3}, {4},'{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{32}','{17}','{18}','{19}','{20}','{21}','{22}','{23}','{24}')", emp.Employee_pass_id, emp.Lname, emp.Fname, emp.Birthday, emp.Gender, emp.Picture, emp.Origin_country, emp.Il_citizen, emp.Add_city, emp.Add, emp.Add_num, emp.Phone, emp.Com_app, emp.Sys_id, emp.Insurance, emp.Com_insurance, emp.Fam_stat_code, emp.Salary_hour, emp.Salary_overtime, emp.Salary_trans, emp.Day_off, emp.Sabatical, emp.Occupation_code, emp.Active, emp.Disable_reason);//לבדוק מה סטרינג כי הוא מצריך גרשיים אחדיים ולאינט לא!לבדוק מי צריך מה לגבי בול והשאר
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

    //--------------------------------------------------------------------
    // insert an Business
    //--------------------------------------------------------------------
    public int insertEmpBus(Employee emp)
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

        String cStr = BuildInsertCommandEmpBus(emp);      // helper method to build the insert string

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
    private String BuildInsertCommandEmpBus(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', {1} ,'{2}')", emp.Employee_pass_id, emp.Business, emp.Start_date);
        String prefix = "INSERT INTO [employee in business] " + "(employee_pass_id, bus_id, start_date)";
        command = prefix + sb.ToString();

        return command;
    }

    //--------------------------------------------------------------------
    // insert a New Visa
    //--------------------------------------------------------------------
    public int inserNewtVIsa(Employee emp)
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

        String cStr = BuildInsertNewVisaCommand(emp);      // helper method to build the insert string

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
    private String BuildInsertNewVisaCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}' ,'{2}', '{3}', '{4}','{5}','{6}')",emp.Doctype_id,emp.Picture, DateTime.Now.ToString("yyyy-MM-dd"), emp.Ex_date,"True",emp.Employee_pass_id,emp.Doc_id);
        String prefix = "UPDATE DOCS SET active = 'false'  where emp_id = '" + emp.Employee_pass_id + "' and doctype_id='" + emp.Doctype_id + "'; INSERT INTO DOCS " + "(doctype_id,img_url,last_update,ex_date,active,emp_id,doc_id)";
        command = prefix + sb.ToString();

        return command;
    }

    //--------------------------------------------------------------------
    // insert and update Disable reason
    //--------------------------------------------------------------------
    public int updateDisablEmp(Disable_Reason dis)
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

        String cStr = BuildupdateDisablEmp(dis);      // helper method to build the insert string

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
    // Build the Insert & update command String for employee
    //--------------------------------------------------------------------
    private String BuildupdateDisablEmp(Disable_Reason dis)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}' ,'{2}')", dis.Did, dis.Emp_id, dis.Description);
        String prefix = "UPDATE EMPLOYEE SET active = 'false' where employee_pass_id = '" + dis.Emp_id + "'; UPDATE [employee in business] set end_date = '" + DateTime.Now.ToString("yyyy-MM-dd") + "' WHERE employee_pass_id = '" + dis.Emp_id +"' and end_date is null; INSERT INTO EMP_DIS_REASON (did, emp_id, description)";// where emp_id = '" + emp.Employee_pass_id + "' and doctype_id='" + emp.Doctype_id + "'; INSERT INTO DOCS " + "(doctype_id,img_url,last_update,ex_date,active,emp_id,doc_id)";
        command = prefix + sb.ToString();

        return command;
    }
    #endregion



    #region UPDATE COMMAND

    //--------------------------------------------------------------------
    // Update Employee
    //--------------------------------------------------------------------
    public Employee update(Employee emp)
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
            return emp;
        }
        catch (Exception ex)
        {
            return null;
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
        String prefix = "UPDATE EMPLOYEE SET lname = '" + emp.Lname + "', fname = '" + emp.Fname + "', birthday = '" + emp.Birthday + "', gender = '" + emp.Gender  + "', origin_country = '" + emp.Origin_country + "', il_citizen = '" + emp.Il_citizen + "', add_city = '" + emp.Add_city + "', [add] = '" + emp.Add + "', add_num = '" + emp.Add_num + "', phone = '" + emp.Phone + "', com_app = '" + emp.Com_app + "', monthly_rent = '"+ emp.Rent + "', michpal_id = '" + emp.Sys_id + "', insurance = '" + emp.Insurance + "', com_insurance = '" + emp.Com_insurance + "', fam_stat_code = '" + emp.Fam_stat_code +  "', active = '" + emp.Active + "' Where employee_pass_id = '" + emp.Employee_pass_id + "'"; //"', salary_hour = '" + emp.Salary_hour + "', salary_overtime = '" + emp.Salary_overtime + "', salary_trans = '" + emp.Salary_trans + "', day_off_id = '" + emp.Day_off + "', sabatical = '" + emp.Sabatical + "', occupation_code = '" + emp.Occupation_code + "', Picture = '" + emp.Picture
        command = prefix;// prefix;

        return command;
    }
    /// <summary>
    /// 
    /// </summary>
    /// <param name="emp"></param>
    /// <returns> employee active</returns>
  
    public int UpdateToActive(string emp)
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

        String cStr = BuildUpdateactiveCommand(emp);      // helper method to build the insert string

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
    // Build the active emp  command String
    //--------------------------------------------------------------------
    private String BuildUpdateactiveCommand(string emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE EMPLOYEE SET  active ='1' Where employee_pass_id = '" + emp + "' "; //"', salary_hour = '" + emp.Salary_hour + "', salary_overtime = '" + emp.Salary_overtime + "', salary_trans = '" + emp.Salary_trans + "', day_off_id = '" + emp.Day_off + "', sabatical = '" + emp.Sabatical + "', occupation_code = '" + emp.Occupation_code + "', Picture = '" + emp.Picture
        command = prefix;// prefix;

        return command;
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="emp"></param>
    /// <returns> employee insurance</returns>

    public int EmpInsurance(Employee emp)
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

        String cStr = BuildUpdateInsuranceCommand(emp);      // helper method to build the insert string

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
    // Build the insurance update command String
    //--------------------------------------------------------------------
    private String BuildUpdateInsuranceCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE EMPLOYEE SET  [insurance] ='1' , com_insurance = '" +emp.Com_insurance + "' Where employee_pass_id = '" + emp.Employee_pass_id + "'"; //"', salary_hour = '" + emp.Salary_hour + "', salary_overtime = '" + emp.Salary_overtime + "', salary_trans = '" + emp.Salary_trans + "', day_off_id = '" + emp.Day_off + "', sabatical = '" + emp.Sabatical + "', occupation_code = '" + emp.Occupation_code + "', Picture = '" + emp.Picture
        command = prefix;// prefix;

        return command;
    }


    public int cancelInsurance(Employee emp)
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

        String cStr = BuildcancelInsuranceCommand(emp);      // helper method to build the insert string

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
    // Build the insurance update command String
    //--------------------------------------------------------------------
    private String BuildcancelInsuranceCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE EMPLOYEE SET  [insurance] ='0' , com_insurance = '0' Where employee_pass_id = '" + emp.Employee_pass_id + "'"; //"', salary_hour = '" + emp.Salary_hour + "', salary_overtime = '" + emp.Salary_overtime + "', salary_trans = '" + emp.Salary_trans + "', day_off_id = '" + emp.Day_off + "', sabatical = '" + emp.Sabatical + "', occupation_code = '" + emp.Occupation_code + "', Picture = '" + emp.Picture
        command = prefix;// prefix;

        return command;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="emp"></param>
    /// <returns> employee gmah</returns>

    public int updateGmah(Employee emp)
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

        String cStr = BuildUpdateGmahCommand(emp);      // helper method to build the insert string

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
    // Build the insurance update command String
    //--------------------------------------------------------------------
    private String BuildUpdateGmahCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE EMPLOYEE SET [final_bill] ='"+emp.Final_bill+"'  Where employee_pass_id = '" + emp.Employee_pass_id + "'"; 
        command = prefix;// prefix;

        return command;
    }

    
    /// <summary>
    /// 
    /// </summary>
    /// <param name="emp"></param>
    /// <returns> employee gmah</returns>

    public int updateDiur(Employee emp)
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

        String cStr = BuildupdateDiurCommand(emp);      // helper method to build the insert string

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
    // Build the insurance update command String
    //--------------------------------------------------------------------
    private String BuildupdateDiurCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE EMPLOYEE SET [com_app] ='" + emp.Com_app + "'  Where employee_pass_id = '" + emp.Employee_pass_id + "'";
        command = prefix;// prefix;

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

    //--------------------------------------------------------------------
    // Update emp in bus end date
    //--------------------------------------------------------------------
    public int updateFinDate(Employee emp)
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

        String cStr = BuildEndDateUpdateCommand(emp);      // helper method to build the insert string

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
    private String BuildEndDateUpdateCommand(Employee emp)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string (start_date is the beggining of the new busi and the end of the no busi)
        String prefix = "UPDATE [employee in business] SET end_date = '" + emp.Start_date + "' Where employee_pass_id = '" + emp.Employee_pass_id + "' and end_date is null";
        command = prefix;// prefix;

        return command;
    }

    //--------------------------------------------------------------------
    // Update business
    //--------------------------------------------------------------------
    public Business updateBusiness(Business bus)
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

        String cStr = BuildUpdateCommandBusiness(bus);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return bus;
        }
        catch (Exception ex)
        {
            return null;
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
    // Build the business command String
    //--------------------------------------------------------------------
    private String BuildUpdateCommandBusiness(Business bus)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        String prefix = "UPDATE BUSINESSES SET bus_name = '"+ bus.Bus_name + "', [add] = '"+ bus.Add + "', add_city = '" + bus.Add_city + "', add_num = '" + bus.Add_num + "', bus_type_code = '" + bus.Bus_type_code + "', department_code = " + bus.Department_code + " Where bus_id = " + bus.Bus_id; 
        command = prefix;// prefix;

        return command;
    }
    #endregion
}