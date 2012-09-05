<?php
/**
 * admin 目录下 index 业务逻辑操作类
 * @author	jonah.fu
 * @date	2012-09-04
 */
class act_admin_index {

	/**
	 * index 主题
	 */
	public static function main() {
		echo '..';

	}

	/**
	 * index 菜单
	 */
	public static function menu() {
		base_cmshop::smarty() -> display('menu.html');
	}

	/**
	 * index 顶部
	 */
	public static function top() {
		base_cmshop::smarty() -> display('top.html');
	}

}
?>