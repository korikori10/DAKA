using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Contact
/// </summary>
public class Contact
{

    string contact_id;
    string contact_name;
    int phone;
    string email;
    int role_id;
    int bus_id;
    string role_name;
    string role_desc;

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

    public Contact()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public List<Contact> getRoles()
    {
        DBServices dbs = new DBServices();

        List<Contact> LC = dbs.readRoles();

        return LC;

    }

    public List<Contact> getContacts()
    {
        DBServices dbs = new DBServices();

        List<Contact> LC = dbs.readContacts();

        return LC;

    }

    public int InsertContact(Contact con)
    {
        DBServices dbs = new DBServices();

        int b = dbs.insert(con);


        return b;

    }

    public int UpdateContact(Contact con)
    {
        DBServices dbs = new DBServices();

        int b = dbs.updateCont(con);


        return b;

    }
}
