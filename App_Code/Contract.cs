using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Contract
/// </summary>
public class Contract
{
    int contract_code;
    int contype_id;
    DateTime signature_sdate;
    DateTime signature_fdate;
    string contract_pic;

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

    public int Contype_id
    {
        get
        {
            return contype_id;
        }

        set
        {
            contype_id = value;
        }
    }

    public DateTime Signature_sdate
    {
        get
        {
            return signature_sdate;
        }

        set
        {
            signature_sdate = value;
        }
    }

    public DateTime Signature_fdate
    {
        get
        {
            return signature_fdate;
        }

        set
        {
            signature_fdate = value;
        }
    }

    public string Contract_pic
    {
        get
        {
            return contract_pic;
        }

        set
        {
            contract_pic = value;
        }
    }

    public Contract()
    {
        //
        // TODO: Add constructor logic here
        //
    }
}