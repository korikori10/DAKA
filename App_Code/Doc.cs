using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Doc
/// </summary>
public class Doc
{
    string doc_id;
    int doctype_id;
    string img_url;
    DateTime last_update;
    DateTime ex_date;
    bool active;
    string employee_pass_id;
    string doc_name;
    string doc_desc;

    public string Doc_id
    {
        get
        {
            return doc_id;
        }

        set
        {
            doc_id = value;
        }
    }

    public int Doctype_id
    {
        get
        {
            return doctype_id;
        }

        set
        {
            doctype_id = value;
        }
    }

    public string Img_url
    {
        get
        {
            return img_url;
        }

        set
        {
            img_url = value;
        }
    }

    public DateTime Last_update
    {
        get
        {
            return last_update;
        }

        set
        {
            last_update = value;
        }
    }

    public DateTime Ex_date
    {
        get
        {
            return ex_date;
        }

        set
        {
            ex_date = value;
        }
    }

    public bool Active
    {
        get
        {
            return active;
        }

        set
        {
            active = value;
        }
    }

    public string Employee_pass_id
    {
        get
        {
            return employee_pass_id;
        }

        set
        {
            employee_pass_id = value;
        }
    }

    public string Doc_name
    {
        get
        {
            return doc_name;
        }

        set
        {
            doc_name = value;
        }
    }

    public string Doc_desc
    {
        get
        {
            return doc_desc;
        }

        set
        {
            doc_desc = value;
        }
    }

    public Doc()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public Doc(string doc_id, int doctype_id, string img_url, DateTime last_update, DateTime ex_date, bool active)
    {
        this.doc_id = doc_id;
        this.doctype_id = doctype_id;
        this.img_url = img_url;
        this.last_update = last_update;
        this.ex_date = ex_date;
        this.active = active;
    }

    public List<Doc> getDocs(Doc d)
    {
        DBServices dbs = new DBServices();

        List<Doc> LD = dbs.ReadDocs(d);

        return LD;
        //
    }
    
            public List<Doc> getDocTypes()
    {
        DBServices dbs = new DBServices();

        List<Doc> LD = dbs.ReadDocTypes();

        return LD;
        //
    }
}