using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Disable_Reason
/// </summary>
public class Disable_Reason
{
    int did;
    string d_name;
    string description;
    string emp_id;
    public Disable_Reason()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Disable_Reason(int did, string d_name, string description, string emp_id)
    {
        this.did = did;
        this.d_name = d_name;
        this.description = description;
        this.emp_id = emp_id;
    }

    public int Did
    {
        get
        {
            return did;
        }

        set
        {
            did = value;
        }
    }

    public string D_name
    {
        get
        {
            return d_name;
        }

        set
        {
            d_name = value;
        }
    }

    public string Description
    {
        get
        {
            return description;
        }

        set
        {
            description = value;
        }
    }

    public string Emp_id
    {
        get
        {
            return emp_id;
        }

        set
        {
            emp_id = value;
        }
    }

    //selectize list dashbord
    public List<Disable_Reason> getDisable()
    {
        DBServices dbs = new DBServices();

        List<Disable_Reason> DC = dbs.getDisable();

        return DC;

    }

    //selectize insert update dashboard
    public int updateDisablEmp(Disable_Reason dis)
    {
        DBServices dbs = new DBServices();

        int e = dbs.updateDisablEmp(dis);


        return e;

    }

}