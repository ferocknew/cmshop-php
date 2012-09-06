<?php
/**
 * 数据层基类
 */
class model_base {
	public static function DB($type = '') {
		$pdo = base_pdomysql::connect();
		$conn = $pdo -> mConn;

		return $conn;
	}

}
?>