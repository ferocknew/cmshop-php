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

		return self::$smarty;
	}

}
?>