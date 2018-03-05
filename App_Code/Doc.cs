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

    public Doc()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}