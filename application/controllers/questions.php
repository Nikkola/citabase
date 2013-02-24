<?php 

class Questions_Controller enxtends Base_Controller {
	public $restful = true;

	public function get_index() {
		return View::make('questions.index')
			->with('title', 'Цитабаза - вопросы и ответы')
	};
};


 ?>