using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication3
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //我这在后台模拟数据库数据 你看下
            List<Produce> listp = new List<Produce>();


            for (int i = 0; i < 6; i++)
            {
                Produce p = new Produce();

                p.Id = i + 1;
                p.Pname = "厂家" + i + 1;
                p.Paddress = "厂家地址" + i;
                p.PPersong = "张三" + i;
                listp.Add(p);
            }

            List<Goods> listgoods = new List<Goods>();
            for (int i = 0; i < 6; i++)
            {
                Goods g = new Goods();
                g.goodsdecription = "ddd" + i;
                g.goodsnum = "goods" + i;
                g.goodsname = "goods" + i + "2";
                g.Id = i + 1;
                //g.goodsPId = listp.Single(p => p.Id == 3).Paddress;
                listgoods.Add(g);
            }
            GridView1.DataSource = listgoods;
            GridView1.DataBind();

            int u = 1;


        }
        public class Goods
        {
            public int Id { get; set; }
            public string goodsnum { get; set; }
            public string goodsname { get; set; }
            public string goodsdecription { get; set; }
            public string goodsPId { get; set; }
        }
        public class Produce
        {
            public int Id { get; set; }
            public string Pname { get; set; }
            public string Paddress { get; set; }
            public string PPersong { get; set; }
        }
        public int CheckLogin(string username, string password)
        {
            return 1;
        }
        ///单点登录(Single Sign On) 
        public void SSOMethods(string username, string password)
        {
            //判断登录情况 此处方法省略…… 
            int result = CheckLogin(username, password);
            if (result > 0)
            {
                //唯一标识，可自行设定 
                string key = string.Format("{0}_{1}", username, password);//key zhangsan_123456
                //得到Cache中的key值 
                string userCache = Cache[key].ToString();
                //判断是否为空 
                //if (string.IsNullOrEmpty(userCache))
                //{
                //    TimeSpan SessionTimeOut = new TimeSpan(0, 0, HttpContext.Current.Session.Timeout, 0, 0);
                //    HttpContext.Current.Cache.Insert(key, key, null, DateTime.MaxValue, SessionTimeOut, CacheItemPriority, NotRemovable, null);
                //    Session["User"] = key;
                //    Response.Write("<font color=red>登录成功！</font>");
                //}
                //else
                //{
                //    Response.Write("<font color=red>抱歉，您已经在其他地方登录了！</font>");
                //    return;
                //}
            }
            else
            {
                Response.Write("用户名不存在！");
            }
        }
    }
}