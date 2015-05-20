using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace webtestcollection
{
    public partial class WebForm3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // 声明委托变量
            ProcessDelegate process;
            Console.WriteLine("请输入用逗号分隔的两个数字：");
            string input = Console.ReadLine();
            int commaPos = input.IndexOf(',');
            double param1 = Convert.ToDouble(input.Substring(0, commaPos));
            double param2 = Convert.ToDouble(input.Substring(commaPos + 1, input.Length - commaPos - 1));

            Console.WriteLine("输入M乘法D除法");
            input = Console.ReadLine();

            // 初始化委托变量
            if (input == "M")
                process = new ProcessDelegate(Multiply);
            //注释：此处也可以写process = Multiply
            else
                process = new ProcessDelegate(Divide);

            // 使用委托调用函数
            double result = process(param1, param2);
            Console.WriteLine("结果:{0}", result);
            Console.ReadKey();

        }
        // 声明委托
        delegate double ProcessDelegate(double param1, double param2);
        static double Multiply(double param1, double param2)
        {
            return param1 * param2;
        }

        static double Divide(double param1, double param2)
        {
            return param1 / param2;
        }
    }

}