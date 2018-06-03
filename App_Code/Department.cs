using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for City
/// </summary>
public class Department
{
    int id;
    string name;

    public Department()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public Department(int id, string name)
    {
        this.id = id;
        this.name = name;
    }

    public string Name
    {
        get
        {
            return name;
        }

        set
        {
            name = value;
        }
    }

    public int Id
    {
        get
        {
            return id;
        }

        set
        {
            id = value;
        }
    }

    public List<Department> getDepartments()
    {
        DBServices dbs = new DBServices();

        List<Department> LD = dbs.readDepartments();

        return LD;

    }
}