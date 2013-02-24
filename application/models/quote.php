<?php 

class Quote extends Basemodel {

	public static $rules = array(
		'quote'=>'required|min:10|max:255',
		'author'=>'required|min:2'
	);


	public function user() {
		return $this->belongs_to('User');
	}

}

 ?>