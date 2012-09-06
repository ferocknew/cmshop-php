<?php
/**
 * admin model 数据层逻辑
 * @author	jonah.fu
 * @date	2012-09-04
 */
class model_admin_set extends model_base {
	/**
	 * 读取网站配置
	 */
	public static function cms_config_get() {
		$sql = "
		select `configkey`,`value`
			from " . base_cmshop::table('config') . "
			where parent_id>0
		";
		$rows = self::DB() -> query($sql) -> fetchAll();
		$return = array();
		foreach ($rows as $v) {
			$keyName = explode("_", $v['configkey']);
			if (count($keyName) == 2)				$return[$keyName[0]][$keyName[1]] = $v['value'];
		}

		return $return;	}

	/**
	 * 保存网站配置
	 */
	public static function cms_config_save($data = array()) {
		$sql = "
		update " . base_cmshop::table('config') . " c set c.`value`=:value where c.`configkey`=:configkey
		";
		$rs = self::DB() -> prepare($sql);
		try {
			self::DB() -> beginTransaction();
			foreach ($data as $k => $v) {
				$rs -> execute(array(
					'value' => $v,
					'configkey' => $k
				));
			}
			return self::DB() -> commit();
		} catch(Exception $e) {
			self::DB() -> rollBack();
			exit($e -> getTraceAsString());

		}
	}

}
?>