﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Class1
/// </summary>
public class Employee
{
  private string employee_pass_id;
    private string lname;
    private string fname;
    private DateTime birthday;
    private bool gender;
    private string picture;
    private int origin_country;
    private bool il_citizen;
    private int add_city;
    string add_city_name;
    private string add;
    private int add_num;
    private int phone;
    private bool com_app;
    private int sys_id;
    private bool insurance;
    private bool com_insurance;
    private int fam_stat_code;
    private double salary_hour;
    private double salary_overtime;
    private double salary_trans;
    private int day_off;
    private int sabatical;
    private int occupation_code;
    private bool active;
    private string disable_reason;
    private string bus_name;
    string day_off_name;
    DateTime ex_date;
    DateTime start_date;
    DateTime start_date1;
    DateTime end_date;
    int dayspass;
    private bool updateBus;
    private int business;
    private int rent;
    int doctype_id;
    string img_url;
    string occupation_desc;
    DateTime last_update;
    string doc_id;
    bool food_incloud;
    float food_pay;
    float monthly_rent;
    bool final_bill;
    string commence_date;
    string start_Year;
    int bus_id;
    string employeeCount;
    string growth;
    string start_year_for_month;
    string months;
    string employeeCountMonth;
    string january, february, march, april, may, june, july, august, september, october, november, december;
    string month, moving_AVG;
    
 
    public Employee()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    //for history
    public Employee(string employee_pass_id, string lname, string fname, string bus_name, DateTime start_date, DateTime end_date)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.bus_name = bus_name;
        this.start_date = start_date;
        this.end_date = end_date;
    }
    //for employee not active
    public Employee(string employee_pass_id, string lname, string fname, int sys_id, DateTime ex_date, int phone, string disable_reason,string bus_name,bool com_app,bool com_insurance, bool final_bill)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.sys_id = sys_id;
        this.ex_date = ex_date;
        this.phone = phone;
        this.disable_reason = disable_reason;
        this.bus_name = bus_name;
        this.com_app = com_app;
        this.com_insurance = com_insurance;
        this.final_bill = final_bill;
    }

    //for employees no busi
    public Employee(string employee_pass_id, string lname, string fname, int sys_id, int phone, int dayspass,string bus_name)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.Sys_id = sys_id;
        this.phone = phone;
        this.bus_name = bus_name;
        this.dayspass = dayspass;
    }
    public Employee(string employee_pass_id, string lname, string fname, int sys_id, DateTime ex_date,int phone,int bus_id)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.sys_id = sys_id;
        this.ex_date = ex_date;
        this.phone = phone;
        this.bus_id = bus_id;

    }
    public Employee(string employee_pass_id, string lname, string fname, int sys_id, string bus_name, bool insurance, bool il_citizen, bool active)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.il_citizen = il_citizen;
        this.sys_id = sys_id;
        this.insurance = insurance;
        this.active = active;
        this.bus_name = bus_name;


    }
    public Employee(string employee_pass_id, string lname, string fname, DateTime birthday, bool gender, string picture, int origin_country, bool il_citizen, int add_city, string add, int add_num, int phone, bool com_app, int sys_id, bool insurance, bool com_insurance, int fam_stat_code, double salary_hour, double salary_overtime, double salary_trans, int day_off, int sabatical, int occupation_code, bool active , int rent, int business)
    {
        this.employee_pass_id = employee_pass_id;
        this.lname = lname;
        this.fname = fname;
        this.birthday = birthday;
        this.gender = gender;
        this.picture = picture;
        this.origin_country = origin_country;
        this.il_citizen = il_citizen;
        this.add_city = add_city;
        this.add = add;
        this.add_num = add_num;
        this.phone = phone;
        this.com_app = com_app;
        this.sys_id = sys_id;
        this.insurance = insurance;
        this.com_insurance = com_insurance;
        this.fam_stat_code = fam_stat_code;
        this.salary_hour = salary_hour;
        this.salary_overtime = salary_overtime;
        this.salary_trans = salary_trans;
        this.day_off = day_off;
        this.sabatical = sabatical;
        this.occupation_code = occupation_code;
        this.active = active;
        this.monthly_rent = rent;
        this.business = business;
    }

   
    //newvisaupdate
    public Employee(int doctype_id, string img_url, DateTime last_update, DateTime ex_date, bool active, string employee_pass_id,string doc_id)
    {
        this.doctype_id = doctype_id;
        this.img_url = img_url;
        this.last_update = last_update;
        this.ex_date = ex_date;
        this.active = active;
        this.employee_pass_id = employee_pass_id;
        this.doc_id = doc_id;
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

    public string Lname
    {
        get
        {
            return lname;
        }

        set
        {
            lname = value;
        }
    }

    public string Fname
    {
        get
        {
            return fname;
        }

        set
        {
            fname = value;
        }
    }

    public DateTime Birthday
    {
        get
        {
            return birthday;
        }

        set
        {
            birthday = value;
        }
    }

    public bool Gender
    {
        get
        {
            return gender;
        }

        set
        {
            gender = value;
        }
    }

    public string Picture
    {
        get
        {
            return picture;
        }

        set
        {
            picture = value;
        }
    }

    public int Origin_country
    {
        get
        {
            return origin_country;
        }

        set
        {
            origin_country = value;
        }
    }

    public bool Il_citizen
    {
        get
        {
            return il_citizen;
        }

        set
        {
            il_citizen = value;
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

    public bool Com_app
    {
        get
        {
            return com_app;
        }

        set
        {
            com_app = value;
        }
    }

    public int Sys_id
    {
        get
        {
            return sys_id;
        }

        set
        {
            sys_id = value;
        }
    }

    public bool Insurance
    {
        get
        {
            return insurance;
        }

        set
        {
            insurance = value;
        }
    }

    public bool Com_insurance
    {
        get
        {
            return com_insurance;
        }

        set
        {
            com_insurance = value;
        }
    }

    public int Fam_stat_code
    {
        get
        {
            return fam_stat_code;
        }

        set
        {
            fam_stat_code = value;
        }
    }

    public double Salary_hour
    {
        get
        {
            return salary_hour;
        }

        set
        {
            salary_hour = value;
        }
    }

    public double Salary_overtime
    {
        get
        {
            return salary_overtime;
        }

        set
        {
            salary_overtime = value;
        }
    }

    public double Salary_trans
    {
        get
        {
            return salary_trans;
        }

        set
        {
            salary_trans = value;
        }
    }

    public int Day_off
    {
        get
        {
            return day_off;
        }

        set
        {
            day_off = value;
        }
    }

    public int Sabatical
    {
        get
        {
            return sabatical;
        }

        set
        {
            sabatical = value;
        }
    }

    public int Occupation_code
    {
        get
        {
            return occupation_code;
        }

        set
        {
            occupation_code = value;
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

    public string Disable_reason
    {
        get
        {
            return disable_reason;
        }

        set
        {
            disable_reason = value;
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

    public int Dayspass
    {
        get
        {
            return dayspass;
        }

        set
        {
            dayspass = value;
        }
    }

    public bool UpdateBus
    {
        get
        {
            return updateBus;
        }

        set
        {
            updateBus = value;
        }
    }

    public int Business
    {
        get
        {
            return business;
        }

        set
        {
            business = value;
        }
    }

    public DateTime Start_date
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

    public DateTime End_date
    {
        get
        {
            return end_date;
        }

        set
        {
            end_date = value;
        }
    }

    public int Rent
    {
        get
        {
            return rent;
        }

        set
        {
            rent = value;
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

    public bool Final_bill
    {
        get
        {
            return final_bill;
        }

        set
        {
            final_bill = value;
        }
    }

    public string Start_Year
    {
        get
        {
            return start_Year;
        }

        set
        {
            start_Year = value;
        }
    }

    public string EmployeeCount
    {
        get
        {
            return employeeCount;
        }

        set
        {
            employeeCount = value;
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

    public string Start_year_for_month
    {
        get
        {
            return start_year_for_month;
        }

        set
        {
            start_year_for_month = value;
        }
    }

    public string Months
    {
        get
        {
            return months;
        }

        set
        {
            months = value;
        }
    }

    public string EmployeeCountMonth
    {
        get
        {
            return employeeCountMonth;
        }

        set
        {
            employeeCountMonth = value;
        }
    }

    public bool Food_incloud
    {
        get
        {
            return food_incloud;
        }

        set
        {
            food_incloud = value;
        }
    }

    public float Food_pay
    {
        get
        {
            return food_pay;
        }

        set
        {
            food_pay = value;
        }
    }

    public float Monthly_rent
    {
        get
        {
            return monthly_rent;
        }

        set
        {
            monthly_rent = value;
        }
    }

    public string January
    {
        get
        {
            return january;
        }

        set
        {
            january = value;
        }
    }

    public string February
    {
        get
        {
            return february;
        }

        set
        {
            february = value;
        }
    }

    public string March
    {
        get
        {
            return march;
        }

        set
        {
            march = value;
        }
    }

    public string April
    {
        get
        {
            return april;
        }

        set
        {
            april = value;
        }
    }

    public string May
    {
        get
        {
            return may;
        }

        set
        {
            may = value;
        }
    }

    public string June
    {
        get
        {
            return june;
        }

        set
        {
            june = value;
        }
    }

    public string July
    {
        get
        {
            return july;
        }

        set
        {
            july = value;
        }
    }

    public string August
    {
        get
        {
            return august;
        }

        set
        {
            august = value;
        }
    }

    public string September
    {
        get
        {
            return september;
        }

        set
        {
            september = value;
        }
    }

    public string October
    {
        get
        {
            return october;
        }

        set
        {
            october = value;
        }
    }

    public string November
    {
        get
        {
            return november;
        }

        set
        {
            november = value;
        }
    }

    public string December
    {
        get
        {
            return december;
        }

        set
        {
            december = value;
        }
    }


    public int Bus_id
    {
        get
        {
            return bus_id;

           
        }
        set
        { bus_id = value; }
    }
    public string Commence_date
    {
        get
        {
            return commence_date;
        }

        set
        {

            commence_date = value;
        }
    }

    public string Month
    {
        get
        {
            return month;
        }

        set
        {
            month = value;
        }
    }

    public string Moving_AVG
    {
        get
        {
            return moving_AVG;
        }

        set
        {
            moving_AVG = value;
        }
    }

    public DateTime Start_date1
    {
        get
        {
            return start_date1;
        }

        set
        {
            start_date1 = value;
        }
    }

    public string Add_city_name
    {
        get
        {
            return add_city_name;
        }

        set
        {
            add_city_name = value;
        }
    }

    public string Occupation_desc
    {
        get
        {
            return occupation_desc;
        }

        set
        {
            occupation_desc = value;
        }
    }

    public string Day_off_name
    {
        get
        {
            return day_off_name;
        }

        set
        {
            day_off_name = value;
        }
    }

    public List<Employee> getEmployees()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.readEmployees();

        return LE;
        //
    }
    public List<Employee> getNewEmployees()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.ReadEmployeesNoInsu();

        return LE;
        
    }
    public List<Employee> getArchive()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.getArchive();

        return LE;

    }
    public List<Employee> ReadEmployeesNeedNewVisa()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.ReadEmployeesNeedNewVisa();

        return LE;
        //
    }
    public List<Employee> ReadEmployeesNotActive()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.ReadEmployeesNotActive();

        return LE;
        //
    }
    public List<Employee> getEmployeesnobisiness()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.readEmployeesNoBusiness();

        return LE;

    }
    public Employee getEmployeeById(string pass)
{
    DBServices dbs = new DBServices();

    Employee e = dbs.ReadEmployee(pass);

    return e;

}
    public Employee GetUpdateEmployee(Employee emp)
    {
        DBServices dbs = new DBServices();

        Employee e = dbs.update(emp);
        if (e.UpdateBus)
        {
            dbs.updateFinDate(e);
            dbs.insertEmpBus(e);
        }

        return e;

    }
    public int updateEmpBus(Employee e)
    {
        DBServices dbs = new DBServices();
     int i = 0;
          i +=  dbs.updateFinDate(e);
           i += dbs.insertEmpBus(e);
     

        return i;

    }
    
    public List<Employee> getEmployeesnobisinessStat()
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.readEmployeesNoBusinessStat();

        return LE;

    }
    public List<Employee> getHistory(string pass)
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.ReadHistory(pass);

        return LE;

    }
    public int UpdateToActive(string emp)
    {
        DBServices dbs = new DBServices();

        int LE = dbs.UpdateToActive(emp);

        return LE;

    }
    public int UpdateToUNActive(string emp)
    {
        DBServices dbs = new DBServices();

        int LE = dbs.UpdateToUnActive(emp);

        return LE;

    }
    public List<Employee> UpdateToUnActive(string pass)
    {
        DBServices dbs = new DBServices();

        List<Employee> LE = dbs.ReadHistory(pass);

        return LE;

    }
    public int UpdateInsuracne(Employee emp)
    {
        DBServices dbs = new DBServices();

        int e = dbs.EmpInsurance(emp);
    

        return e;

    }
    public int cancelInsurance(Employee emp)
    {
        DBServices dbs = new DBServices();

        int e = dbs.cancelInsurance(emp);


        return e;

    }

    public int updateGmah(Employee emp)
    {
        DBServices dbs = new DBServices();

        int e = dbs.updateGmah(emp);


        return e;

    }
    
        public int updateDiur(Employee emp)
    {
        DBServices dbs = new DBServices();

        int e = dbs.updateDiur(emp);


        return e;

    }
    public int updateVisa(Employee emp)
    {
        DBServices dbs = new DBServices();

        int e = dbs.inserNewtVIsa(emp);


        return e;

    }

    public int insertEmployee(Employee e)
    {


        DBServices dbs = new DBServices();
        dbs.insert(e);
       int inserted = dbs.insertNEWEmpBus(e);
        return inserted;
    }
}