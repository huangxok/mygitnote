using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace webtestcollection
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public void main()
        {
            int i, j, m, n;
            i = 8;
            j = 10;
            m = ++i;
            n = j++;
            //printf("%d,%d,%d,%d"，i，j,m,n);
        }


    }
}