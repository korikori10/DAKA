using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for City
/// </summary>
public class City
{
    int id;
    string name;

    public City()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    public City(int id, string name)
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

    public List<City> getCities()
    {
        DBServices dbs = new DBServices();

        List<City> LC = dbs.readCities();

        return LC;

    }
}