using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Summary description for AJAXWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AJAXWebService : System.Web.Services.WebService
{

    public AJAXWebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getCities()
    {
        City c = new City();
        List<City> LC = c.getCities();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LC);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getCountries()
    {
        Country c = new Country();
        List<Country> LC = c.getCountries();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LC);
        return jsonStringCategory;

    }

    
            [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getDepartments()
    {
        Department d = new Department();
        List<Department> LD = d.getDepartments();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LD);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getTypes()
    {
        Business t = new Business();
        List<Business> LT = t.getTypes();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LT);
        return jsonStringCategory;

    }

    
            [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getUserTypes()
    {
        User ut = new User();
        List<User> LUT = ut.getTypes();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LUT);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getRoles()
    {
        Contact c = new Contact();
        List<Contact> LC = c.getRoles();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LC);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void getBusinessesTable()
    {
        Business b = new Business();
        List<Business> LB = b.getBusinesses();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LB);
        Context.Response.Write(jsonStringCategory);

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getBusinesses()
    {
        Business b = new Business();
        List<Business> BC = b.getBusinesses();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(BC);
        return jsonStringCategory;

    }

    
            [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getUsers()
    {
        User U = new User();
        List<User> UL = U.getUsers();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(UL);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getContacts()
    {
        Contact c = new Contact();
        List<Contact> LC = c.getContacts();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(LC);
        return jsonStringCategory;

    }


    //selectize disable list
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getDisable()
    {
        Disable_Reason d = new Disable_Reason();
        List<Disable_Reason> DC = d.getDisable();
        JavaScriptSerializer js = new JavaScriptSerializer();

       


        // serialize to string
        string jsonStringCategory = js.Serialize(DC);
        return jsonStringCategory;

    }

    //employees table
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void getEmployeess()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployees();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to strinet
        var jsonStringCategory =  js.Serialize(LE) ;
     
        Context.Response.Write(jsonStringCategory);

    }

    //for employees search
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getEmployees()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployees();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        return jsonStringCategory;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getEmployeesearch()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployees();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        return jsonStringCategory;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void getArchive()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getArchive();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        Context.Response.Write(jsonStringCategory);

    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void getNewEmployees()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getNewEmployees();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        // return jsonStringCategory;
        Context.Response.Write(jsonStringCategory);

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void GetHistory(string pass)
    {
        Employee e = new Employee();
        List<Employee> LE = e.getHistory(pass);
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);

        Context.Response.Write(jsonStringCategory);

    }

    /// <summary>
    /// Returning employee to active from archive
    /// </summary>
    /// <param name="pass"></param>
    /// <returns></returns>

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateToActive(string pass)
    {
        Employee e = new Employee();

        int updated = e.UpdateToActive(pass);
        // serialize to string
        JavaScriptSerializer js = new JavaScriptSerializer();
        string jsonStringCategory = js.Serialize(updated);
        return jsonStringCategory;


    }
    /// <summary>
    ///  employee to unactive and send to archive
    /// </summary>
    /// <param name="pass"></param>
    /// <returns></returns>

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateToUnActive(string EmployeeInfo)
    {
        Employee e = new Employee();

        int updated = e.UpdateToUNActive(EmployeeInfo);
        // serialize to string
        JavaScriptSerializer js = new JavaScriptSerializer();
        string jsonStringCategory = js.Serialize(updated);
        return jsonStringCategory;


    }
    //employee update insurance
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateInsurance(string EmployeeInfo )
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);



        int updated = e.UpdateInsuracne(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        //another notification for insurance status change
        //if (updated > 0)
        //{


        //    var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;
        //    string pushTXT = "מצב הביטוח של עובד מס " + e.Employee_pass_id + " השתנה";
        //    request.KeepAlive = true;
        //    request.Method = "POST";
        //    request.ContentType = "application/json; charset=utf-8";

        //    request.Headers.Add("authorization", "Basic MTZiZDk0Y2EtMzc5Ni00YWM5LWJmMjgtYWVmYjNhYjFkZTJi");

        //    var serializer = new JavaScriptSerializer();
        //    var obj = new
        //    {
        //        app_id = "83d04d9a-0af5-47ff-8e0d-daa16120ede1",
        //        contents = new { en = "Employee insurance status", he = pushTXT },
        //        headings = new { en = "Employee number " + e.Employee_pass_id + " insurance status has changed", he = "סטאטוס ביטוח" },
        //        included_segments = new string[] { "All" }
        //    };
        //    var param = serializer.Serialize(obj);
        //    byte[] byteArray = Encoding.UTF8.GetBytes(param);

        //    string responseContent = null;

        //    try
        //    {
        //        using (var writer = request.GetRequestStream())
        //        {
        //            writer.Write(byteArray, 0, byteArray.Length);
        //        }

        //        using (var response = request.GetResponse() as HttpWebResponse)
        //        {
        //            using (var reader = new StreamReader(response.GetResponseStream()))
        //            {
        //                responseContent = reader.ReadToEnd();
        //            }
        //        }
        //    }
        //    catch (WebException ex)
        //    {
        //        System.Diagnostics.Debug.WriteLine(ex.Message);
        //        System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
        //    }

        //    System.Diagnostics.Debug.WriteLine(responseContent);
        //}
        return jsonStringCategory;
    }

    //employee update insurance
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string cancelInsurance(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);



        int updated = e.cancelInsurance(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;
    }

    //employee update gmah
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string updateGmahWS(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);

        int updated = e.updateGmah(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string updateDiur(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);



        int updated = e.updateDiur(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;
    }

    //[WebMethod]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public string UpdateToActive(string pass)
    //{
    //    Employee e = new Employee();

    //    int updated = e.UpdateToActive(pass);
    //    // serialize to string
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    string jsonStringCategory = js.Serialize(updated);
    //    return jsonStringCategory;
    //    //Employee e = new Employee();
    //    //List<Employee> LE = e.UpdateToActive(pass);

    //    //// serialize to string
    //    //string jsonStringCategory = js.Serialize(LE);
    //    //return jsonStringCategory;
    //    //  Context.Response.Write(js.Serialize(LE));

    //}

    //employee update insurance

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string updateVisa(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);



        int updated = e.updateVisa(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;
    }

    //[WebMethod]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public string updateDisablEmp(string EmployeeInfo)
    //{
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    Employee e = js.Deserialize<Employee>(EmployeeInfo);



    //    int updated = e.updateDisablEmp(e);

    //    // serialize to string
    //    string jsonStringCategory = js.Serialize(e);
    //    return jsonStringCategory;
    //}

//selectize busi
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string updateEmpBusiness(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);



        int updated = e.updateEmpBus(e);

        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;
    }
   
    //selectize disable reason
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string Updatedisablereason(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Disable_Reason d = js.Deserialize<Disable_Reason>(EmployeeInfo);



        int updated = d.updateDisablEmp(d);

        // serialize to string
        string jsonStringCategory = js.Serialize(d);
        return jsonStringCategory;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertSignature(string svgString, string[] fileString)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        PDF pdf = new PDF();
        List<string> saveFileString = pdf.AddSignature(svgString, fileString);
        string jsonStringCategory = js.Serialize(saveFileString);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string InsertDoc(string FileInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Doc file = js.Deserialize<Doc>(FileInfo);

        int updated = file.updateDoc(file);
        // serialize to string
        string jsonStringCategory = js.Serialize(file);
        return jsonStringCategory;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getOccupation()
    {
        Occupation o = new Occupation();
        List<Occupation> LE = o.getOccupation();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        //Context.Response.Write(jsonStringCategory);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void ReadEmployeesNeedNewVisa()
    {
        Employee e = new Employee();
        List<Employee> LE = e.ReadEmployeesNeedNewVisa();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);

        Context.Response.Write(jsonStringCategory);

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void ReadEmployeesNotActive()
    {
        Employee e = new Employee();
        List<Employee> LE = e.ReadEmployeesNotActive();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);

        Context.Response.Write(jsonStringCategory);

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadDocs(string DocsInfo)
    {
     

        JavaScriptSerializer js = new JavaScriptSerializer();
        Doc d = js.Deserialize<Doc>(DocsInfo);


        List<Doc> LD = d.getDocs(d);
        // serialize to string
        string jsonStringCategory = js.Serialize(LD);
        return jsonStringCategory;


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadDocsBusi(string DocsInfo)
    {


        JavaScriptSerializer js = new JavaScriptSerializer();
        Doc d = js.Deserialize<Doc>(DocsInfo);


        List<Doc> LD = d.getBusiDocs(d);
        // serialize to string
        string jsonStringCategory = js.Serialize(LD);
        return jsonStringCategory;


    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getDocTypes()
    {
        Doc d = new Doc();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<Doc> LD = d.getDocTypes();
        // serialize to string
        string jsonStringCategory = js.Serialize(LD);
        return jsonStringCategory;


    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetEmployeeById(string pass)
{
    Employee e = new Employee();
    e =  e.getEmployeeById(pass);


    JavaScriptSerializer js = new JavaScriptSerializer();
    // serialize to string
    string jsonStringCategory = js.Serialize(e);
    return jsonStringCategory;

}

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetUpdateEmployee(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);

 

        e = e.GetUpdateEmployee(e);
        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;

    }

    
            [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertBusiness(string BusinessInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Business b = js.Deserialize<Business>(BusinessInfo);



      int b1 = b.InsertBusiness(b);
        // serialize to string
        string jsonStringCategory = js.Serialize(b);
        return jsonStringCategory;

    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertBusinessAndContact(string BusiInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Business b = js.Deserialize<Business>(BusiInfo);



        int b1 = b.insertBusinessAndContactServer(b);
        // serialize to string
        string jsonStringCategory = js.Serialize(b);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertEmployee(string EmployeeInfo)
    {


        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);
        e.Commence_date = DateTime.Now.ToString("dd/MM/yyy");
        int inserted = e.insertEmployee(e);
        PDF pdf = new PDF();
        List<string> contractPath = pdf.fillForm(e);

        if (inserted > 0)
        {


            var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;
            string pushTXT = "נוסף עובד חדש מס' " + e.Employee_pass_id;
            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.Headers.Add("authorization", "Basic MTZiZDk0Y2EtMzc5Ni00YWM5LWJmMjgtYWVmYjNhYjFkZTJi");

            var serializer = new JavaScriptSerializer();
            var obj = new
            {
                app_id = "83d04d9a-0af5-47ff-8e0d-daa16120ede1",
                contents = new { en = "Employee insurance status", he = pushTXT },
                headings = new { en = "Employee number " + e.Employee_pass_id + " insurance status has changed", he = "עובד חדש במערכת!" },
                included_segments = new string[] { "All" }
            };
            var param = serializer.Serialize(obj);
            byte[] byteArray = Encoding.UTF8.GetBytes(param);

            string responseContent = null;

            try
            {
                using (var writer = request.GetRequestStream())
                {
                    writer.Write(byteArray, 0, byteArray.Length);
                }

                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        responseContent = reader.ReadToEnd();
                    }
                }
            }
            catch (WebException ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
            }

            System.Diagnostics.Debug.WriteLine(responseContent);
        }

        string jsonStringCategory = js.Serialize(contractPath);
        return jsonStringCategory;


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertContact(string contactInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Contact c = js.Deserialize<Contact>(contactInfo);



        int c1 = c.InsertContact(c);
        // serialize to string
        string jsonStringCategory = js.Serialize(c1);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertContract(string DocsInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Doc c = js.Deserialize<Doc>(DocsInfo);



        int c1 = c.insertContract(c);
        // serialize to string
        string jsonStringCategory = js.Serialize(c1);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string insertUser(string UserInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        User u = js.Deserialize<User>(UserInfo);



        int c1 = u.InsertUser(u);
        // serialize to string
        string jsonStringCategory = js.Serialize(c1);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void updateUserPass(string userName, string pass)
    {
        User u = new User();
        u.updatePass(userName, pass);


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteUser(string UserInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        User u = js.Deserialize<User>(UserInfo);

        DBServices db = new DBServices();
        db.delete(u);


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateContact(string contactInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Contact c = js.Deserialize<Contact>(contactInfo);



        int c1 = c.UpdateContact(c);
        // serialize to string
        string jsonStringCategory = js.Serialize(c1);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateUser(string UserInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
      User u = js.Deserialize<User>(UserInfo);



        int u1 = u.UpdateUser(u);
        // serialize to string
        string jsonStringCategory = js.Serialize(u1);
        return jsonStringCategory;

    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string updateBusiness(string BusinessInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Business b = js.Deserialize<Business>(BusinessInfo);



        b = b.updateBusiness(b);
        // serialize to string
        string jsonStringCategory = js.Serialize(b);
        return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void getEmployeesnobusiness()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployeesnobisiness();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        Context.Response.Write(jsonStringCategory);

    }
   
    //statistics
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadTotalnewemp()
    {
        DBServices db = new DBServices();
        int[] arr = db.ReadTotalnewemp();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(arr);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadTotalAllemp()
    {
        DBServices db = new DBServices();
        int[] arr = db.ReadTotalAllemp();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(arr);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadEmpByYearStatistics()
    {
        DBServices db = new DBServices();
        List<Employee> arr = db.ReadEmpByYearStatistics();
        List<string> years = new List<string>();
        List<string> counts = new List<string>();
        List<string> growth = new List<string>();
        foreach (var item in arr)
        {
            years.Add(item.Start_Year);
            counts.Add(item.EmployeeCount.ToString());
            growth.Add(item.Growth.ToString());
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(new List<string>[] { years, counts, growth });
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadEmpByMonthStatistics()
    {
        DBServices db = new DBServices();
        List<Employee> arr = db.ReadEmpByMonthStatistics();
        List<string> year = new List<string>();
        List<string> jan = new List<string>();
        List<string> feb = new List<string>();
        List<string> march = new List<string>();
        List<string> apr = new List<string>();
        List<string> may = new List<string>();
        List<string> jun = new List<string>();
        List<string> jul = new List<string>();
        List<string> aug = new List<string>();
        List<string> sep = new List<string>();
        List<string> oc = new List<string>();
        List<string> nov = new List<string>();
        List<string> dec = new List<string>();

        foreach (var item in arr)
        {
            year.Add(item.Start_year_for_month);
            jan.Add(item.January.ToString());
            feb.Add(item.February.ToString());
            march.Add(item.March.ToString());
            apr.Add(item.April.ToString());
            may.Add(item.May.ToString());
            jun.Add(item.June.ToString());
            jul.Add(item.July.ToString());
            aug.Add(item.August.ToString());
            sep.Add(item.September.ToString());
            oc.Add(item.October.ToString());
            nov.Add(item.November.ToString());
            dec.Add(item.December.ToString());
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(new List<string>[] { year,jan,feb,march,apr,may,jun,jul,aug,sep,oc,nov,dec });
        return jsonStringCategory;


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadBusiByYearStatistics()
    {
        DBServices db = new DBServices();
        List<Business> arr = db.ReadBusiByYearStatistics();
        List<string> retArr = new List<string>();
        List<string> years = new List<string>();
        List<string> counts = new List<string>();
        List<string> growth = new List<string>();
        foreach (var item in arr)
        {
            years.Add(item.Start_date);
            counts.Add(item.Count.ToString());
            growth.Add(item.Growth.ToString());
        }

  
       
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(new List<string>[] {years,counts,growth });
        return jsonStringCategory;

    }
    
     [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadSMARTELEMENT()
    {
        DBServices db = new DBServices();
        List<Employee> arr = db.ReadSMARTELEMENTStatistic();
        List<string> Month = new List<string>();
        List<string> EmployeeCountMonth = new List<string>();
        List<string> Moving_AVG = new List<string>();
      

        foreach (var item in arr)
        {
            Month.Add(item.Month);
            EmployeeCountMonth.Add(item.EmployeeCountMonth.ToString());
            Moving_AVG.Add(item.Moving_AVG.ToString());
          
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(new List<string>[] { Month, EmployeeCountMonth, Moving_AVGs });
        return jsonStringCategory;


    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getUserByUserName(string username, string userPass)
    {
        bool match;
        User u = new User();
        match = u.getUserByUserName(username , userPass);

        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(match);
        return jsonStringCategory;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadBusiByQuarterStatistics()
    {
        DBServices db = new DBServices();
        List<Business> arr = db.ReadBusiByQuarterStatistics();
        List<string> years = new List<string>();
        List<string> Q1 = new List<string>();
        List<string> Q2 = new List<string>();
        List<string> Q3 = new List<string>();
        List<string> Q4 = new List<string>();

        foreach (var item in arr)
        {
           years.Add(item.Commence_date_Year);
            Q1.Add(item.Q1.ToString());
           Q2.Add(item.Q2.ToString());
            Q3.Add(item.Q3.ToString());
            Q4.Add(item.Q4.ToString());
        }
        //List<string> Q1F = new List<string> { Q1[0], Q2[0], Q3[0], Q4[0] };
        //List<string> Q2F = new List<string> { Q1[1], Q2[1], Q3[1], Q4[1] };
        //List<string> Q3F = new List<string> { Q1[2], Q2[2], Q3[2], Q4[2] };
       // List<string> Q4F = new List<string> { Q1[3], Q2[3], Q3[3], Q4[3] };


        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(new List<string>[] {  years,Q1,Q2,Q3,Q4 });
        return jsonStringCategory;

    }
    //send SMS
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string PostDataToURL() {
        Employee e = new Employee();
        List<Employee> LE = e.ReadEmployeesNeedNewVisa();
            string phone = "";
        //int micpal ;
        //string country, pass, name;
        //DateTime startdate;
        foreach (Employee emp in LE)

        {
            phone +="0"+ emp.Phone+";";
            //micpal = emp.Sys_id;
            //country = emp.Origin_country;
            //pass = emp.Employee_pass_id;
            //name = emp.Fname + " " + emp.Lname;
            //startdate = emp.Start_date;


        }
        //set password, user name, message text, semder name and number
        string userName ="smsgal";
        string password ="gal969";
        string messageText = System.Security.SecurityElement.Escape(" תזכורת: יש לחדש ויזה בשלושה ימים הקרובים. בסיום יש ליצור קשר. ");
        string sender = "daka";
        //set phone numbers
        string phonesList =phone;//0503333334;0503333335;0503333336;0503333337";
        //set additional parameters
        string timeToSend = DateTime.Now.ToString("dd/MM/yyyy hh:mm");
        // create XML
        StringBuilder sbXml = new StringBuilder();
        sbXml.Append("<Inforu>");
        sbXml.Append("<User>");
        sbXml.Append("<Username>" + userName + "</Username>");
        sbXml.Append("<Password>" + password + "</Password>");
        sbXml.Append("</User>");
        sbXml.Append("<Content Type=\"sms\">");
        sbXml.Append("<Message>" + messageText + "</Message>");
        sbXml.Append("</Content>");
        sbXml.Append("<Recipients>");
        sbXml.Append("<PhoneNumber>" + phonesList + "</PhoneNumber>");
        sbXml.Append("</Recipients>");
        sbXml.Append("<Settings>");
        sbXml.Append("<Sender>" + sender + "</Sender>");
       // sbXml.Append("<MessageInterval>" + messageInterval + "</MessageInterval>");
        sbXml.Append("<TimeToSend>" + timeToSend + "</TimeToSend>");
        sbXml.Append("</Settings>");
        sbXml.Append("</Inforu >");
        string strXML = HttpUtility.UrlEncode(sbXml.ToString(), System.Text.Encoding.UTF8);
        //string result = PostDataToURL("https://api.inforu.co.il/SendMessageXml.ashx", "InforuXML=" + strXML);
      
            //Setup the web request
            string szResult = string.Empty;
            WebRequest Request = WebRequest.Create("https://api.inforu.co.il/SendMessageXml.ashx");
            Request.Timeout = 30000;
            Request.Method = "POST";
            Request.ContentType = "application/x-www-form-urlencoded";
            //Set the POST data in a buffer
            byte[] PostBuffer;
            try
            {
            // replacing " " with "+" according to Http post RPC
                string szData = "InforuXML=" + strXML;
                szData = szData.Replace(" ", "+");
                //Specify the length of the buffer
                PostBuffer = Encoding.UTF8.GetBytes(szData);
                Request.ContentLength = PostBuffer.Length;
                //Open up a request stream
                Stream RequestStream = Request.GetRequestStream();
                //Write the POST data
                RequestStream.Write(PostBuffer, 0, PostBuffer.Length);
                //Close the stream
                RequestStream.Close();
                //Create the Response object
                WebResponse Response;
                Response = Request.GetResponse();
                //Create the reader for the response
                StreamReader sr = new StreamReader(Response.GetResponseStream(), Encoding.UTF8);
                //Read the response
                szResult = sr.ReadToEnd();
                //Close the reader, and response
                sr.Close();
                Response.Close();
                return szResult;
            }
            catch (Exception ex)
            {
                return szResult;
            }
        }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void SendEmail(string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);
        try
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("kori.hash@gmail.com", "liroy1010"),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false

            };
            MailMessage mail = new MailMessage();
            //System.Net.Mail.Attachment attachment;
          //  string DOC = "/images/IMG_1659.JPG";
            //attachment = new System.Net.Mail.Attachment(DOC);
          //  mail.Attachments.Add(attachment);
            // Get date-only portion of date, without its time.
            DateTime dateOnly = e.Start_date.Date;
            // Display date using short date string.
            string g = (dateOnly.ToString("d"));

            Country c = new Country();
            List<Country> LC = c.getCountries();
            string country = "";

            foreach (var item in LC)
            {
                if (item.Id == e.Origin_country)
                {
                    country = item.Name;
                }
            }
            string outEmail = "kori.hash@gmail.com"; 
            string reEmail = "tolas22@gmail.com";
            string Subject = "ביטוח לעובד מספר  " + e.Sys_id;
            string message = "היי,\nמבקשת לבצע ביטוח לעובד מספר מכפל " + e.Sys_id + "\nנתין: " + country + "\nמספר דרכון: " + e.Employee_pass_id + "\n שם מלא: " + e.Fname + " " + e.Lname + "\n מתאריך: " + DateTime.Now.ToString("yyyy-MM-dd");
            mail.To.Add(outEmail);
            mail.From = new MailAddress(reEmail);
            mail.Subject = Subject;
            mail.Body = message;
            mail.IsBodyHtml = true;
            //client.Send( outEmail, reEmail, Subject, message );
            client.Credentials = new NetworkCredential(reEmail, "Tk170917");
            client.Send(mail);
            
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        //Console.ReadLine();
        //Response.Write("SEND MAIL");
    }



    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void CancelInsuranceSendEmail (string EmployeeInfo)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Employee e = js.Deserialize<Employee>(EmployeeInfo);
        try
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("kori.hash@gmail.com", "liroy1010"),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false

            };
            MailMessage mail = new MailMessage();
            //System.Net.Mail.Attachment attachment;
            //  string DOC = "/images/IMG_1659.JPG";
            //attachment = new System.Net.Mail.Attachment(DOC);
            //  mail.Attachments.Add(attachment);
            // Get date-only portion of date, without its time.
            DateTime dateOnly = e.Ex_date.Date;
            // Display date using short date string.
           string g = (dateOnly.ToString("d"));

            Country c = new Country();
            List<Country> LC = c.getCountries();
            string country = "";

            foreach (var item in LC)
            {
                if (item.Id == e.Origin_country)
                {
                    country = item.Name;
                }
            }
            string outEmail = "kori.hash@gmail.com";
            string reEmail = "tolas22@gmail.com";
            string Subject = "ביטוח לעובד מספר  " + e.Sys_id;
            string message = "היי,\n מבקשת לבטל ביטוח לעובד מספר מכפל " + e.Sys_id + "\n מספר דרכון: " + e.Employee_pass_id + "\n שם מלא: " + e.Fname + " " + e.Lname + "\n מתאריך: " +g;//"\nנתין: " + country +
            mail.To.Add(outEmail);
            mail.From = new MailAddress(reEmail);
            mail.Subject = Subject;
            mail.Body = message;
            mail.IsBodyHtml = true;
            //client.Send( outEmail, reEmail, Subject, message );
            client.Credentials = new NetworkCredential(reEmail, "Tk170917");
            client.Send(mail);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        //Console.ReadLine();
        //Response.Write("SEND MAIL");
    }
}

