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
    string u_type_name;
    string user_img;

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

    public string U_type_name
    {
        get
        {
            return u_type_name;
        }

        set
        {
            u_type_name = value;
        }
    }

    public string User_img
    {
        get
        {
            return user_img;
        }

        set
        {
            user_img = value;
        }
    }

    public User()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public User(int uid, string u_name, string u_pwd, string full_name, int u_type_code, int phone, string user_img)
    {
        this.uid = uid;
        this.u_name = u_name;
        this.u_pwd = u_pwd;
        this.full_name = full_name;
        this.u_type_code = u_type_code;
        this.phone = phone;
        this.user_img = user_img;
    }
    public User getUserByUserName(string username)
    {
        DBServices dbs = new DBServices();

        User u = dbs.ReadUsers(username);

        return u;

    }
    public List<User> getUsers()
    {
        DBServices dbs = new DBServices();

        List<User> BC = dbs.readUsers();

        return BC;
    }
    public List<User> getTypes()
    {
        DBServices dbs = new DBServices();

        List<User> BC = dbs.readUserTypes();

        return BC;
    }
    public int UpdateUser(User u)
    {
        DBServices dbs = new DBServices();

        
        return dbs.updateUser(u);

    }
    public int InsertUser(User u)
    {
        DBServices dbs = new DBServices();

        int u1 = dbs.insert(u);


        return u1;

    }
    public void updatePass(string userName, string pass)
    {
        DBServices dbs = new DBServices();

        dbs.updateUserPass(userName, pass);
    }
}