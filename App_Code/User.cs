using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for User
/// </summary>
public class User
{

    int uid;
    string u_name;
    string u_pwd;
    string full_name;
    int u_type_code;
    int phone;

    public int Uid
    {
        get
        {
            return uid;
        }

        set
        {
            uid = value;
        }
    }

    public string U_name
    {
        get
        {
            return u_name;
        }

        set
        {
            u_name = value;
        }
    }

    public string U_pwd
    {
        get
        {
            return u_pwd;
        }

        set
        {
            u_pwd = value;
        }
    }

    public int U_type_code
    {
        get
        {
            return u_type_code;
        }

        set
        {
            u_type_code = value;
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

    public string Full_name
    {
        get
        {
            return full_name;
        }

        set
        {
            full_name = value;
        }
    }

    public User()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}