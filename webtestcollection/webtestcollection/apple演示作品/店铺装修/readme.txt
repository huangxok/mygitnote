
 =>
	源代码中的 JavaScript 主要分为三大部分：用户层，界面层，逻辑层。
	用户层主要针对用户视图来实现交互的功能。
	界面层相对于用户层更低层次的实现了一些通用功能，如果基本流程一致，那么可以移植的使用。
	逻辑层仅仅实现了逻辑和构思的需求，可以用作任何装修店铺的支持。

 =>
	逻辑层（接口）主要有以下几个方法（具体的用法可以结合测试地址查看）：
	SHOP_TEMPLATE.load 加载模板页
	SHOP_TEMPLATE.command 执行命令（添加，编辑，隐藏，恢复）
	SHOP_TEMPLATE.dialog 弹出对话框
	SHOP_TEMPLATE.foreach 返回模板页中的模块序列
	SHOP_TEMPLATE.classes 返回模板页中的区域对象

 =>
	界面层（接口）主要有以下几个方法（具体的用法可以结合测试查看）：
	SHOP_TEMPLATE_UI.foreach 返回未修改过的模板页中的模块序列
	SHOP_TEMPLATE_UI.alert 弹出警告框（我在用户层把它进一步的代替了 window.alert）
	SHOP_TEMPLATE_UI.confirm 弹出确认框（我在用户层把它进一步的代替了 window.confirm）
	SHOP_TEMPLATE_UI.loader 加载器（依次执行函数，出现遮罩层和旋转圆圈的效果，并提示加载进度）
	SHOP_TEMPLATE_UI.loadTemplatePage 加载模板页
	SHOP_TEMPLATE_UI.loadTemplateList 加载模板列表
	SHOP_TEMPLATE_UI.loadTemplateHistoryList 加载模板历史列表
	SHOP_TEMPLATE_UI.loadTemplatePageList 加载模板页列表
	SHOP_TEMPLATE_UI.loadTemplateXPageList 加载模板可选页列表
	SHOP_TEMPLATE_UI.save 保存
	SHOP_TEMPLATE_UI.exit 退出

 =>
	用户层都是一些零散的函数，主要是结合 HTML 代码来实现用户交互，这部分内容仅仅作为开发的参考。

 =>
	此外，使用这套开放性前端（框架）时应该参考"template.htm"（模板页）中的结构，它是保证系统运行的关键。