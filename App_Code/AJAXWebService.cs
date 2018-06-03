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
        // serialize to string
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
        if (updated > 0)
        {


            var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;
            string pushTXT = "מצב הביטוח של עובד מס " + e.Employee_pass_id + " השתנה";
            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.Headers.Add("authorization", "Basic MTZiZDk0Y2EtMzc5Ni00YWM5LWJmMjgtYWVmYjNhYjFkZTJi");

            var serializer = new JavaScriptSerializer();
            var obj = new
            {
                app_id = "83d04d9a-0af5-47ff-8e0d-daa16120ede1",
                contents = new { en = "Employee insurance status", he = pushTXT },
                headings = new { en = "Employee number " + e.Employee_pass_id + " insurance status has changed", he = "סטאטוס ביטוח" },
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
        int[] arr = db.ReadEmpByYearStatistics();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(arr);
        return jsonStringCategory;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadEmpByMonthStatistics()
    {
        DBServices db = new DBServices();
        int[] arr = db.ReadEmpByMonthStatistics();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(arr);
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
        string messageText = System.Security.SecurityElement.Escape(" תזכורת מספר 1: יש לחדש ויזה בשלושה ימים הקרובים. בסיום יש ליצור קשר. ");
        string sender = "daka";
        //set phone numbers
        string phonesList =phone;//0503333334;0503333335;0503333336;0503333337";
        //set additional parameters
        string timeToSend = "20/04/2018 21:21";
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
                Credentials = new NetworkCredential("tolas22@gmail.com", "Tk11061989"),
                EnableSsl = true
            };
            MailMessage mail = new MailMessage();
            System.Net.Mail.Attachment attachment;
            string DOC = "/images/IMG_1659.JPG";
            attachment = new System.Net.Mail.Attachment(DOC);
            mail.Attachments.Add(attachment);
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
            client.Send("tolas22@gmail.com", "kori.hash@gmail.com", "ביטוח לעובד מספר  " +
                e.Sys_id, "היי,\nמבקשת לבצע ביטוח לעובד מספר מכפל " +
                e.Sys_id + "\nנתין: " + country + "\nמספר דרכון: " + e.Employee_pass_id + "\n שם מלא: " + e.Fname + " " + e.Lname + "\n מתאריך- " + g );
            client.Send(mail);
            Console.WriteLine("Sent");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        //Console.ReadLine();
        //Response.Write("SEND MAIL");
    }
}

