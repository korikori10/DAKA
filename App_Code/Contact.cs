using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Contact
/// </summary>
public class Contact
{

    int contact_id;
    string contact_name;
    int phone;
    string email;
    int role_id;

    public int Contact_id
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

    public Contact()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}