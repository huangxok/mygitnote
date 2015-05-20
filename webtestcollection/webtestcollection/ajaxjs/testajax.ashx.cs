using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;

namespace webtestcollection.ajaxjs
{
    /// <summary>
    /// Summary description for testajax
    /// </summary>
    public class testajax : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string username = context.Request.Form["username"];
            string username1 = context.Request.QueryString["username"];

            Person p = new Person();
            p.name = username;
            p.age = "20";
            //string s = "<div>" + p.name + "</div>";
            //s += "<div>" + p.age + "</div>";
            JavaScriptSerializer ser = new JavaScriptSerializer();
            string s = ser.Serialize(p);

            context.Response.Write(s);
        }
        public class Person
        {
            public string name;
            public string age;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}