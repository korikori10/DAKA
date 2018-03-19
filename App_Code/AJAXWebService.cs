using System;
using System.Collections.Generic;
using System.Linq;
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
    public void getEmployees()
    {
        Employee e = new Employee();
        List<Employee> LE = e.getEmployees();
        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        var jsonStringCategory =  js.Serialize(LE) ;
       // string jsonStringCategory = "{\"data\":" + js.Serialize(LE) + "}";
        // return jsonStringCategory;
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
    public string GetUpdateEmployee(string Employee_pass_id)
    {
        Employee e = new Employee();
        e = e.GetUpdateEmployee(Employee_pass_id);


        JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringCategory = js.Serialize(e);
        return jsonStringCategory;

    }

    
}
