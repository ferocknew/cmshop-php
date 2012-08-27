<?php
/**
 * Memcache的封闭类
 *
 * @access  public
 * @return  object
 * @package default
 * @author  Jonah.Fu
 * @date    2012-03-20
 */
class base_memcached extends Memcache {
	private $groupName = MEM_GROUP_ROOT;
	private $groupTempName = "temp:";
	public $groupPath = MEM_GROUP_ROOT;
	public function __construct() {
		$servers = $GLOBALS['cacheServer'];

		foreach ($servers as $item) {
			// $this -> addServer($item['host'], $item['port'], false);
			$this -> addServer($item['host'], $item['port'], 1);
		}

		// 销毁对象
		register_shutdown_function(array(
			&$this,
			'close'
		));
	}

}

// END
?>