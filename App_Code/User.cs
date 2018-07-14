using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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


    public bool getUserByUserName(string username, string userPass)
    {
        DBServices dbs = new DBServices();
        User u = dbs.ReadUsers(username);
        bool match = decryptPass(u.U_pwd, userPass);


        return match;

    }

    public User getUserByUserNameRender(string username)
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

        u.U_pwd = encryptPass(u.U_pwd);

        int u1 = dbs.insert(u);
        return u1;

    }

    public void updatePass(string userName, string pass)
    {
        DBServices dbs = new DBServices();
        pass = encryptPass(pass);
        dbs.updateUserPass(userName, pass);
    }

    private string encryptPass(string pass)
    {
        byte[] salt;
        new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

        var pbkdf2 = new Rfc2898DeriveBytes(pass, salt, 10000);
        byte[] hash = pbkdf2.GetBytes(20);


        byte[] hashBytes = new byte[36];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 20);


        string savedPasswordHash = Convert.ToBase64String(hashBytes);
        return savedPasswordHash;
    }

    private bool decryptPass(string pass, string password)
    {
        /* Fetch the stored value */
        string savedPasswordHash = pass;
        /* Extract the bytes */
        byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
        /* Get the salt */
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);
        /* Compute the hash on the password the user entered */
        var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
        byte[] hash = pbkdf2.GetBytes(20);
        /* Compare the results */
        for (int i = 0; i < 20; i++)
        {
            if (hashBytes[i + 16] != hash[i])
            {
                return false;
            }
        }
                return true;
    }
}