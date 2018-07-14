<%@ Application Language="C#" %>

<script RunAt="server">
    bool timerEnabled = false;
    static System.Timers.Timer timer = new System.Timers.Timer();
    static public string TextFromAsax = "";

    void Application_Start(object sender, EventArgs e)
    {
        timer.Interval = 60000;
        timer.Elapsed += tm_Tick;
        TextFromAsax = "Started";
        
    }

    void tm_Tick(object sender, EventArgs e)
    {
       AJAXWebService ws = new AJAXWebService();
        ws.PostDataToURL();
    }

    public static void StartTimer()
    {
        timer.Enabled = true;
    }

    public static void EndTimer()
    {
        timer.Enabled = false;
    }

    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown

    }

    void Application_Error(object sender, EventArgs e)
    {
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e)
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e)
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }

</script>
