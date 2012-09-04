<?php
/**
 * admin 目录下 全局 业务逻辑操作类
 * @author	jonah.fu
 * @date	2012-09-04
 */
class act_admin_set {
	private static $htmlDir = 'set';
	/**
	 * 站点设置
	 */
	public static function cms_config() {
		base_cmshop::smarty() -> display(self::$htmlDir . '/cms_config.html');

	}

}
?>