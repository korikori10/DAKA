using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for City
/// </summary>
public class Country
{
    int id;
    string name;
    string country_code;

    public Country()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public Country(int id, string name)
    {
        this.id = id;
        this.name = name;
        Country_code = country_code;
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

    public string Country_code
    {
        get
        {
            return country_code;
        }

        set
        {
            country_code = value;
        }
    }

    public List<Country> getCountries()
    {
        DBServices dbs = new DBServices();

        List<Country> LC = dbs.readCountries();

        return LC;

    }
}