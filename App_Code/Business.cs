﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Business
/// </summary>
public class Business
{
    int bus_id;
    string bus_name;
    int add_city;
    string add;
    int add_num;
    int phone;
    int bus_type_code;
    int contract_code;
    int department_code;
    string department_name;
    string bus_type_name;
    public int Bus_id
    {
        get
        {
            return bus_id;
        }

        set
        {
            bus_id = value;
        }
    }

    public string Bus_name
    {
        get
        {
            return bus_name;
        }

        set
        {
            bus_name = value;
        }
    }

    public int Add_city
    {
        get
        {
            return add_city;
        }

        set
        {
            add_city = value;
        }
    }

    public string Add
    {
        get
        {
            return add;
        }

        set
        {
            add = value;
        }
    }

    public int Add_num
    {
        get
        {
            return add_num;
        }

        set
        {
            add_num = value;
        }
    }

    public int Phone
    {
        get
        {
            return phone;
        }

        set
        {
            phone = value;
        }
    }

    public int Bus_type_code
    {
        get
        {
            return bus_type_code;
        }

        set
        {
            bus_type_code = value;
        }
    }

    public int Contract_code
    {
        get
        {
            return contract_code;
        }

        set
        {
            contract_code = value;
        }
    }

    public int Department_code
    {
        get
        {
            return department_code;
        }

        set
        {
            department_code = value;
        }
    }

    public string Department_name
    {
        get
        {
            return department_name;
        }

        set
        {
            department_name = value;
        }
    }

    public string Bus_type_name
    {
        get
        {
            return bus_type_name;
        }

        set
        {
            bus_type_name = value;
        }
    }

    public Business()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Business(int bus_id, string bus_name, int add_city, string add, int add_num, int phone, int bus_type_code, int contract_code)
    {
        this.bus_id = bus_id;
        this.bus_name = bus_name;
        this.add_city = add_city;
        this.add = add;
        this.add_num = add_num;
        this.phone = phone;
        this.bus_type_code = bus_type_code;
        this.contract_code = contract_code;
    }

    public List<Business> getBusinesses()
    {
        DBServices dbs = new DBServices();

        List<Business> BC = dbs.readBusinesses();

        return BC;

    }
    public List<Business> getTypes()
    {
        DBServices dbs = new DBServices();

        List<Business> BC = dbs.readTypes();

        return BC;

    }

    public Business updateBusiness(Business bus)
    {
        DBServices dbs = new DBServices();

        Business b =  dbs.updateBusiness(bus);
   

        return b;

    }
}