�� Miniweaver Property Description
 MW.X��ˮƽ����λ�ã���Чֵ��ֵ��Ĭ��ֵΪ0��
 MW.Y����ֱ����λ�ã���Чֵ��ֵ��Ĭ��ֵΪ0��
 MW.PopUpMenuRelative���˵����������λ�ã���ЧֵΪ��ֵ�����飬Ĭ��ֵΪ[3, 19]��
 MW.Width����ȣ���ЧֵΪ��ֵ��Ĭ��ֵΪ588��
 MW.Height���߶ȣ���ЧֵΪ��ֵ��Ĭ��ֵΪ425��
 MW.ToolboxHeight��������߶ȣ���ЧֵΪ��ֵ��Ĭ��ֵΪ53��
 MW.Color����ɫ����ЧֵΪʮ��������ɫ�ַ�����Ĭ��ֵΪ"#C3DAF9"��
 MW.BackgroundColor��������ɫ����ЧֵΪʮ��������ɫ�ַ�����Ĭ��ֵΪ"#2A66C9"��
 MW.Image��ͼƬ��λ�ã���ЧֵΪURL�ַ�����Ĭ��ֵΪ"MW_IMG/"��
 MW.Face������λ�ã���ЧֵΪURL�ַ��������飬Ĭ��ֵΪ[]��
 MW.Type��ģʽ���ã���ЧֵΪ"ALL"��"PRO"��"BBS"��Ĭ��ֵΪ"PRO"��
 MW.ToolbarType�����������ã���ЧֵΪ"Often", "Format", "Paragraph", "Media"��Ĭ��ֵΪ["Often", "Format", "Paragraph", "Media"]��
 MW.Content����ʼ���ݣ���ЧֵΪ�ַ�����Ĭ��ֵΪ""��
 MW.Config()��ˢ�����ԣ�����༭����
 MW.Recode()�����ر༭���е����ݣ�

�� Miniweaver Example
1) HTML�ĵ�������ʽ���飺
   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" " http://www.w3.org/TR/html4/loose.dtd">
2) ����ҪӦ�ñ༭�����ĵ��������ࣺ
   <script type="text/javascript" src="URL"></script>
3) ���ĵ���ҪӦ�ñ༭���ĵط�����ű���
   <script type="text/javascript">
     <!--
     /* �������ԣ���ʹ��ĳһ���Ե�Ĭ��ֵ����������ÿ���ȱʡ */
     MW.X = 10;
     MW.Y = 50;
     ...

     /* Config ����Ҫ����������������Ϻ� */
     MW.Config();
     //-->
   </script>
4) ˫��������Ŀհ״����Թ������л�ģʽ��
5) ����
   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
   <html>
   <head>
   <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
   <script type="text/javascript" src="MW_OBJ.js"></script>
   </head>

   <body>
   <button onClick="alert(MW.Recode())">��ȡ����</button>
   <script type="text/javascript">
    <!--
    MW.X = 10;
    MW.Y = 50;
    MW.Config();
    //-->
  </script>
  </body>
  </html>