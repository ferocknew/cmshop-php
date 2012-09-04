<?php
/**
 * cmsshop 基类
 */
class base_cmshop {
	private static $smarty;

	/**
	 * 模板静态方法
	 * @author	jonah.fu
	 * @date	2012-09-04
	 */
	public static function smarty() {
		if (self::$smarty == NULL)
			self::$smarty = new base_template();

		$templates = defined('ADMIN_DIR') ? ROOT_PATH . ADMIN_DIR . '/templates' : ROOT_PATH . '/templates';
		$compiled = defined('ADMIN_DIR') ? ROOT_PATH . 'temp/compiled/' . ADMIN_DIR : ROOT_PATH . 'temp/compiled/';
		if (!is_dir($compiled))
			static_function::mkdirs($compiled);
		
		self::$smarty -> template_dir = $templates;
		self::$smarty -> compile_dir = $compiled;
		return self::$smarty;
	}

}
?>