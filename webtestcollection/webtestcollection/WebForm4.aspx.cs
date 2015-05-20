using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

namespace webtestcollection
{
    public partial class WebForm4 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Image1.ImageUrl = "";
            //string result = ""; //定义结果变量
            //string all = ""; //定义全局变量用来装读取的值
            ////string sqlconstr = "select * from book";
            //string connstr = "server=local;database=mybookshop,uid=sa,pwd=''";
            ////string sqlconstr = "select * from book";
            //SqlConnection conn = new SqlConnection(connstr);
            //conn.Open();
            //string sqlconstr = "select * from book";   //这句话可以先写在connstr前或后 我注释掉了
            //SqlCommand cmd = new SqlCommand(sqlconstr, conn);  //这个连接不说了 先看button1_click再来看这
            //SqlDataReader dr = cmd.ExecuteReader();            //这个就是贱读取出来的数据放在dr这个对象中

            //while (dr.Read())
            ////循环是否读取到了数据 如果读取到了数据就进入这个函数 直到把数据读取完 dr.Read();
            ////这个就是判断的 如果为true
            ////就执行括号中的值
            //{
            //    all += dr[0] + "," + dr["title"] + dr[2];   //dr["title"]中title 是数据库的字段名
            //}
            ////不知道你知道什么是栈不？ 我举个例子：比如一个桶 你先往里面装了一个球a 然后再放给球b进去  
            ////那么你取出来的顺序就是先取b 然后才取到a
            ////这就是为什么下面要先关闭dr  然后才是conn
            //dr.Close();       //关闭dr            
            //dr.Dispose();     //释放dr
            //conn.Close();     //关闭conn
            //conn.Dispose();   //释放conn
            //下面是判断是否读取到了数据 存在就返回result的值    即 存在数据
            //if(dr.Read())
            //{
            //    result="存在数据";
            //}


        }
        //protected void button1_click(object sender, EventArgs s)
        //{
        //    string result = ""; //定义结果变量
        //    //方式1   全部采用带参数的构造函数
        //    string connstr = "server=local;database=mybookshop,uid=sa,pwd=''";  //连接数据库的字符串
        //    SqlConnection conn = new SqlConnection(connstr);                    //连接函数      操作类似于你打开sql数据库 输入密码账号
        //    conn.Open();                                                        //打开数据库    操作类似于你点击sql上一步中界面中的确定按钮

        //    string sqlconstr = "inser into book (id,title,zuozhe,jiage) Values('" + TextBox1.Text.ToString().Trim() + "','" + TextBox2.Text.ToString().Trim() + "," + TextBox3.Text.ToString().Trim() + ")";                            //sql语句       操作类似于你在新建查询中写的sql 查询语句
        //    SqlCommand cmd = new SqlCommand(sqlconstr, conn);                   //执行          操作类似于你点击执行 or F5键
        //    int i = cmd.ExecuteNonQuery();                                      //执行完成      操作类似于你点击执行后 下面产生的 受的影响行（i） i为受影响的行数
        //    if (conn.State == ConnectionState.Open)                             //判断连接是否关闭  如果还是开的 就关闭
        //    {
        //        conn.Close();          //关闭连接
        //        conn.Dispose();        //释放连接产生的内存
        //    }
        //    if (i > 0)
        //    {
        //        result = "操作成功";
        //    }
        //    else
        //    {
        //        result = "操作失败";
        //    }
        //    //说明：先创建对象 在给对象的属性复制 你可以理解为 人结婚了后生孩子  
        //    //      如果是创建对象带参数就是  人结婚时已经怀着孩子了  这个比喻你应该理解吧 
        //    //      结婚就是代表新建的这个对象
        //    //方式2 不采用带参数的构造函数
        //    SqlConnection conn1 = new SqlConnection();  //创建一个sqlconnection
        //    conn1.ConnectionString = connstr;           //对sqlconnetion 设置值
        //    conn1.Open();                               //打开连接
        //    SqlCommand cmd2 = new SqlCommand();         //创建一个sqlcommand
        //    cmd2.CommandText = sqlconstr;               //设置执行的sql语句
        //    cmd2.Connection = conn1;                    //设置连接的数据库
        //    int j = cmd2.ExecuteNonQuery();
        //    if (j > 0)
        //    {
        //        result = "操作成功";
        //    }
        //    else
        //    {
        //        result = "操作失败";
        //    }

        //    //执行操作
        //    if (conn.State == ConnectionState.Open)                             //判断连接是否关闭  如果还是开的 就关闭
        //    {
        //        conn.Close();          //关闭连接
        //        conn.Dispose();        //释放连接产生的内存
        //    }
        //}
        //public void getdata()
        //{
        //    string connstr = "server=local;database=mybookshop,uid=sa,pwd=''";
        //    //string sqlconstr = "select * from book";
        //    SqlConnection conn = new SqlConnection(connstr);
        //    conn.Open();
        //    string sqlconstr = "select * from book";   //这句话可以先写在connstr前或后 我注释掉了
        //    SqlDataAdapter da = new SqlDataAdapter(sqlconstr,conn); //这个方法类似于sqlcommand
        //    DataSet ds=new DataSet();
        //    da.Fill(ds);
        //    //DataTable 要引用 using System.Data;
        //    //DataTable 模型就是数据库表的结构模型
        //    DataTable dt = ds.Tables[0];  //理论上我们只查一张表  ds 是可以装多张表的 0代表第一张 这里就一张表
        //    conn.Close();
        //    conn.Dispose();
        //    GridView1.DataSource = ds;   //设置gridview1的数据，即将ds赋值给gridview1 讲数据绑定到gridview1 这个你应该理解吧
        //    //GridView1.DataSource = dt;   //选一个就是了
        //    //因为GridView1.DataSource的类型是object 所以不管是什么都可以绑定在上面比如List<Book> Book 就是数据库表的模型 List<Book>  数据库中表中每行的数据的集合 也是整个表的信息
        //    GridView1.DataBind();//将数据绑定成功

        //    //说明：dataset 是 电脑中的内存  所以这个东西断开了数据库的连接也是存在数据的 因为数据已经放在内存中了
        //    //conn.Close(); conn.Dispose();这2句是断开了数据的连接的 但是dataset中的数据时存在的 在内存中
        //    //你可以试试再用一个按钮来调用下这个dateset 或者 gridview1的数据
        //}
    }
}