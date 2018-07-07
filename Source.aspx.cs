using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Application_Source : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
  

    protected void btn_Start(object sender, EventArgs e)
    {
        ASP.global_asax.StartTimer();
        interval.Text = ASP.global_asax.TextFromAsax;
    }

    protected void btn_End(object sender, EventArgs e)
    {
        ASP.global_asax.EndTimer();
    }
}