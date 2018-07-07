using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Occupation
/// </summary>
public class Occupation
{
    int occupation_code;
    string occupation_desc;
    public Occupation()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public int Occupation_code
    {
        get
        {
            return occupation_code;
        }

        set
        {
            occupation_code = value;
        }
    }

    public string Occupation_desc
    {
        get
        {
            return occupation_desc;
        }

        set
        {
            occupation_desc = value;
        }
    }
    public List<Occupation> getOccupation()
    {
        DBServices dbs = new DBServices();

        List<Occupation> LE = dbs.readOccupation();

        return LE;

    }
}