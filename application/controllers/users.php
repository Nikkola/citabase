<?php 

class Users_Controller entends Base_Controller {
	public $restful = true;

	public function get_new() {
		return View::make('users.new')
			->with('title', 'Цитабаза - регистрация')
	}

	public function post_create() {
		$validation = User::validate(Input::all());

		if ($validation->passes()) {
			User::create(array(
				'username' => Input::get('username'),
				'password' => Hash::make(Input::get('password'))
			));

			return Redirect::to_route('home') -> with('message', "Thanks for registration!");
		} else {
			return Redirect::to_route('register') -> with_errors($validation)->with_input();
		}
	}
}

 ?>