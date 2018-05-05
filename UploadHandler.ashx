<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;
 using System.Web.Script.Serialization;
using System.Web.Script.Services;

public class UploadHandler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        if (context.Request.Files.Count>0)
        {
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                System.Threading.Thread.Sleep(1000);
                HttpPostedFile file = files[i];
                string fileName = context.Server.MapPath("~/images/"+System.IO.Path.GetFileName(file.FileName));
                file.SaveAs(fileName);
              

         JavaScriptSerializer js = new JavaScriptSerializer();
        // serialize to string
        string jsonStringFile = js.Serialize(fileName);
                    context.Response.Write(jsonStringFile);
            }
        }

    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}