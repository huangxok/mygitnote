//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace webtestcollection.jcorp裁剪
//{
//    public class Class1
//    {
//        /// <summary>
//        /// 上传操作，包括提交表单与AJAX上传图片
//        /// </summary>
//        /// <returns></returns>
//        public void Upload()
//        {
//            string action = HttpContext.Request.QueryString["action"];
//            //判断用户的操作类型
//            switch (action.ToLower())
//            {
//                #region 当为上传图片操作时
//                case "up":
//                    foreach (string upload in Request.Files)
//                    {
//                        if (!Request.Files[upload].HasFile())
//                        {
//                            continue;
//                        }
//                        string ExtensionName = Path.GetExtension(Request.Files[upload].FileName).ToLower();
//                        if (ExtensionName != ".jpg" && ExtensionName != ".png" && ExtensionName != ".gif" && ExtensionName != ".bmp")
//                        {
//                            return Redirect("/Tips/tip?error=您上传的图片不符合格式!");
//                        }
//                        string ImgPath = Server.MapPath("/uploads/" + "img" + ExtensionName);
//                        Request.Files[upload].SaveAs(ImgPath);
//                    }
//                    string error = "";
//                    string msg = "上传成功";
//                    string imgurl = "/uploads/img.jpg";
//                    string res = "{ error:'" + error + "', msg:'" + msg + "',imgurl:'" + imgurl + "'}";
//                    return Content(res);
//                    break;
//                #endregion

//                #region 当为裁剪图片操作时
//                case "cut":
//                    string strx1 = HttpContext.Request.Form["x1"];
//                    string stry1 = HttpContext.Request.Form["y1"];
//                    string strcw = HttpContext.Request.Form["cw"];
//                    string strch = HttpContext.Request.Form["ch"];
//                    int intx1 = Convert.ToInt32(strx1);
//                    int inty1 = Convert.ToInt32(stry1);
//                    int intcw = Convert.ToInt32(strcw);
//                    int intch = Convert.ToInt32(strch);

//                    Stream imgStream = GetLocalStream(Server.MapPath("/uploads/" + "img.jpg"));
//                    //System.Drawing.Image initImage = System.Drawing.Image.FromStream(imgStream);
//                    Cut(imgStream, Server.MapPath("/uploads/img.jpg"), intx1, inty1, intcw, intch, 100);
//                    return Redirect("/uploadandcut/index");
//                    break;
//                #endregion

//                default:
//                    return null;
//                    break;
//            }
//        }

//        /// <summary>
//        /// 将一个文件读成字符流
//        /// </summary>
//        /// <param name="InFilePath"></param>
//        /// <returns></returns>
//        public static Stream GetLocalStream(string InFilePath)
//        {
//            return new MemoryStream(ReadFileReturnBytes(InFilePath));
//        }

//        /// <summary>从文件中读取二进制数据</summary>
//        /// <param name="filePath">文件路径</param>
//        /// <returns> byte[]二进制数据</returns>
//        public static byte[] ReadFileReturnBytes(string filePath)
//        {
//            FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
//            BinaryReader br = new BinaryReader(fs);
//            byte[] buff = br.ReadBytes((int)fs.Length);
//            br.Close();
//            fs.Close();
//            return buff;
//        }

//        #region 裁剪操作
//        public static void Cut(System.IO.Stream fromFile, string fileSaveUrl, int xPosition, int yPosition, int width, int height, int quality)
//        {
//            //创建目录
//            //原始图片（获取原始图片创建对象，并使用流中嵌入的颜色管理信息）
//            System.Drawing.Image initImage = System.Drawing.Image.FromStream(fromFile, true);
//            //原始图片的宽、高
//            int initWidth = initImage.Width;
//            int initHeight = initImage.Height;
//            if (xPosition + width > initWidth)
//                width = initWidth - xPosition;
//            if (yPosition + height > initHeight)
//                height = initHeight - yPosition;
//            //与原图相等直接保存
//            if ((width >= initWidth && height >= initHeight) || (width < 1 && height < 1))
//            {
//                initImage.Save(fileSaveUrl, System.Drawing.Imaging.ImageFormat.Jpeg);
//            }
//            else
//            {
//                System.Drawing.Image pickedImage = null;
//                System.Drawing.Graphics pickedG = null;
//                //对象实例化
//                pickedImage = new System.Drawing.Bitmap(width, height);
//                pickedG = System.Drawing.Graphics.FromImage(pickedImage);
//                //设置质量
//                pickedG.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
//                pickedG.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
//                //定位
//                System.Drawing.Rectangle fromR = new System.Drawing.Rectangle(xPosition, yPosition, width, height);
//                System.Drawing.Rectangle toR = new System.Drawing.Rectangle(0, 0, width, height);
//                //画图
//                pickedG.DrawImage(initImage, toR, fromR, System.Drawing.GraphicsUnit.Pixel);
//                //关键质量控制
//                //获取系统编码类型数组,包含了jpeg,bmp,png,gif,tiff
//                System.Drawing.Imaging.ImageCodecInfo[] icis = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
//                System.Drawing.Imaging.ImageCodecInfo ici = null;
//                foreach (System.Drawing.Imaging.ImageCodecInfo i in icis)
//                {
//                    if (i.MimeType == "image/jpeg" || i.MimeType == "image/bmp" || i.MimeType == "image/png" || i.MimeType == "image/gif")
//                    {
//                        ici = i;
//                    }
//                }
//                System.Drawing.Imaging.EncoderParameters ep = new System.Drawing.Imaging.EncoderParameters(1);
//                ep.Param[0] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, (long)quality);
//                //保存缩略图
//                pickedImage.Save(fileSaveUrl, ici, ep);
//                //释放关键质量控制所用资源
//                ep.Dispose();
//                //释放截图资源
//                pickedG.Dispose();
//                pickedImage.Dispose();
//                //释放原始图片资源
//                initImage.Dispose();
//            }
//        }
//        #endregion
//    }



//}