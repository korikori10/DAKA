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
       // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        //return jsonStringCategory;
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
        // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        return jsonStringCategory;
        // Context.Response.Write(jsonStringCategory);

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
        // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        return jsonStringCategory;
       // Context.Response.Write(jsonStringCategory);

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
        //Employee e = new Employee();
        //List<Employee> LE = e.UpdateToActive(pass);
       
        //// serialize to string
        //string jsonStringCategory = js.Serialize(LE);
        //return jsonStringCategory;
      //  Context.Response.Write(js.Serialize(LE));

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
        // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        // return jsonStringCategory;
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
        // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        // return jsonStringCategory;
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
    public void getEmployeesnobusiness()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployeesnobisiness();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory = js.Serialize(LE);
        Context.Response.Write(jsonStringCategory);
        //return jsonStringCategory;

    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string ReadTotalnewemp()
    {
        DBServices db = new DBServices();
        int[] arr = db.ReadTotalnewemp();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        // serialize to string
        string jsonStringCategory = js.Serialize(arr);
        return jsonStringCategory;
        //return jsonStringCategory;

    }

    
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string PostDataToURL() {
        Employee e = new Employee();
        List<Employee> LE = e.ReadEmployeesNeedNewVisa();
            string phone = "";
        foreach (Employee emp in LE)

        {
            phone +="0"+ emp.Phone+";";

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

        SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
        {
            Credentials = new NetworkCredential("tolas22@gmail.com", "Tk11061989"),
            EnableSsl = true
        };
        client.Send("tolas22@gmail.com", "kori.hash@gmail.com", e.Fname + " "+ e.Lname, "Please add insurance to employee number: " + e.Sys_id);
        //Console.WriteLine("Sent");
        //Console.ReadLine();
        //Response.Write("SEND MAIL");
    }
}

