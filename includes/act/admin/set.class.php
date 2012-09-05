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

	/**
	 * 站点设置保存
	 * @author	jonah.fu
	 * @date	2012-09-05
	 */
	public static function cms_config_save() {
		if (empty($_POST))
			exit(OUTPUT_ERR_TEXT);

		$data = array();
		foreach ($_POST as $k => $v) {
			$kName = $k;
			foreach ($v as $k1 => $v1) {
				$data[$kName . '_' . $k1] = $v1;
			}
		}

		print_r($data);
		model_admin_set::cms_config_save($data);
	}

}
?>