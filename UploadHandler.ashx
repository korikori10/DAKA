<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;
 using System.Web.Script.Serialization;
using System.Web.Script.Services;
    using System.IO;

public class UploadHandler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        if (context.Request.Files.Count>0)
        {
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                       System.Threading.Thread.Sleep(1000);
                HttpPostedFile file = files[i];
                string fileRNDName = Path.GetFileName(file.FileName);
                string fileName = context.Server.MapPath("~/images/"+ fileRNDName.Split('.')[0] + Path.GetRandomFileName() +"." + fileRNDName.Split('.')[1]);
                file.SaveAs(fileName);
                string fileUrl = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority) + HttpContext.Current.Request.ApplicationPath + "/images/"+System.IO.Path.GetFileName(file.FileName);

                JavaScriptSerializer js = new JavaScriptSerializer();
                // serialize to string
                string jsonStringFile = js.Serialize(fileUrl);
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