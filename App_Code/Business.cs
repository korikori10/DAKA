using System;
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
    int phoneContact;
    int bus_type_code;
    int contract_code;
    int department_code;
    string department_name;
    string bus_type_name;
    string contact_id;
    string contact_name;
    string email;
    int role_id;
    string role_name;
    string role_desc;
    string start_date;
    string count;
    string growth;
    string commence_date_Year;
    string quarter;
    string businessCountQuarter;
    string q1;
    string q2; string q3; string q4;
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

    public string Start_date
    {
        get
        {
            return start_date;
        }

        set
        {
            start_date = value;
        }
    }

    public string Count
    {
        get
        {
            return count;
        }

        set
        {
            count = value;
        }
    }

    public string Growth
    {
        get
        {
            return growth;
        }

        set
        {
            growth = value;
        }
    }

    public string Commence_date_Year
    {
        get
        {
            return commence_date_Year;
        }

        set
        {
            commence_date_Year = value;
        }
    }


    public string BusinessCountQuarter
    {
        get
        {
            return businessCountQuarter;
        }

        set
        {
            businessCountQuarter = value;
        }
    }

    public string Quarter
    {
        get
        {
            return quarter;
        }

        set
        {
            quarter = value;
        }
    }

    public string Q1
    {
        get
        {
            return q1;
        }

        set
        {
            q1 = value;
        }
    }

    public string Q2
    {
        get
        {
            return q2;
        }

        set
        {
            q2 = value;
        }
    }

    public string Q3
    {
        get
        {
            return q3;
        }

        set
        {
            q3 = value;
        }
    }

    public string Q4
    {
        get
        {
            return q4;
        }

        set
        {
            q4 = value;
        }
    }

    public string Contact_id
    {
        get
        {
            return contact_id;
        }

        set
        {
            contact_id = value;
        }
    }

    public string Contact_name
    {
        get
        {
            return contact_name;
        }

        set
        {
            contact_name = value;
        }
    }

    public string Email
    {
        get
        {
            return email;
        }

        set
        {
            email = value;
        }
    }

    public int Role_id
    {
        get
        {
            return role_id;
        }

        set
        {
            role_id = value;
        }
    }

    public string Role_name
    {
        get
        {
            return role_name;
        }

        set
        {
            role_name = value;
        }
    }

    public string Role_desc
    {
        get
        {
            return role_desc;
        }

        set
        {
            role_desc = value;
        }
    }

    public int PhoneContact
    {
        get
        {
            return phoneContact;
        }

        set
        {
            phoneContact = value;
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
    public int InsertBusiness(Business bus)
    {
        DBServices dbs = new DBServices();

        int b = dbs.insert(bus);


        return b;

    }
    public int insertBusinessAndContactServer(Business bus)
    {
        DBServices dbs = new DBServices();

        int b = dbs.insertBusinessAndContactServer(bus);


        return b;

    }
}