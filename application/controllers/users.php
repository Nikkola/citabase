<?php

class Users_Controller extends Base_Controller {    

	public function action_login()
    {
		//схватили и забили в переменную, все полученные с клиента данные
		$input = Input::get();

		//массив $input в объект приводим
		$objectLogin = (object)$input;


		$user = array(
			'username' => $objectLogin->username, 
			'password' => $objectLogin->password
		);


		//DB::profile();

		if ( Auth::attempt($user)) {

			$id = DB::table('users')->where('username', '=', $objectLogin->username)->only('id');


			//смерджили 4 массива в один объект
			$extended = (object) array_merge(
				array("msg" => 'User is logged in'), 
				array("id" => $id), 
				array("access_token" => true), 
				$user
			);

			return  json_encode($extended);


		} else {
			return json_encode( (object)array("msg" => 'User failed') );
		}

    }    


	public function action_logout()
    {
		Auth::logout();

		print_r(Auth::logout());

		return true;  
    }    

	public function action_registration()
    {
		//схватили и забили в переменную, все полученные с клиента данные
		$input = Input::get();

		//массив $input в объект приводим
		$object = (object)$input;


		//если пользователя с таким email еще не зарегено
		if ( !DB::table('users')->where('email', '=', $object->email)->only('email') ) {

			//создали запись в таблице users, через модель User
			User::create(array(
				'username' => $object->username,
				'email' => $object->email,
				'password' => Hash::make($object->password)
			));

			//авторизация сразу после регистрации
			$user = User::where_username(Input::get('username'))->first() ;
			Auth::login($user);

			if (Auth::check())
			{
				$id = DB::table('users')->where('username', '=', $user->username)->only('id');


				$extended = array(
					'msg' => 'User is logged in', 
					"id" => $id,
					"access_token" => true,
					"username" => $user->username
				);


				Message::to($object->email)
				    ->from('info@citabase.ru', 'Цитабаза')
				    ->subject('Поздравляем ' . $object->username . ' !')
				    ->body('Регистрация прошла успешно. Теперь вы полноценный пользователь цитабазы. Ваше имя: ' . $object->username  . ', Ваш пароль: ' . $object->password . ' ')
				    ->send();


			    //print_r('сразу авторизован!');
				return json_encode($extended);
			}

		} else {
			return json_encode( (object)array("msg" => 'Пользователь с таким email уже зарегистрирован!') );
		}

    }  


	public function action_forget()
    {
		//схватили и забили в переменную, все полученные с клиента данные
		$input = Input::get();

		//массив $input в объект приводим
		$object = (object)$input;

		$userWithThisEmail = DB::table('users')->where('email', '=', $object->email)->first();

		Message::to($userWithThisEmail->email)
		    ->from('nicolachernobaev@gmail.com', 'Цитабаза')
		    ->subject('Восстановление пароля Цитабазы.')
		    ->body('view: emails.pass_forget')
		    ->html(true)
		    ->send();

		// Message::send(function($message, $userWithThisEmail)
		// {
		//     $message->to($userWithThisEmail->email);
		//     $message->from('nicolachernobaev@gmail.com', 'Цитабаза');

		//     $message->subject('Восстановление пароля Цитабазы.');
		//     $message->body('view: emails.pass_forget');

		//     // You can add View data by simply setting the value
		//     // to the message.
		//     $message->body->username = $userWithThisEmail->username;
		//     $message->body->email = $userWithThisEmail->email;

		//     $message->html(true);
		// });


		return json_encode($userWithThisEmail->email);
    }    

	public function action_recovery()
    {
		//схватили и забили в переменную, все полученные с клиента данные
		$input = Input::get();

		//массив $input в объект приводим
		$object = (object)$input;

		$user = DB::table('users')->where('email', '=', $object->email)->first();

		$updatedEmail = DB::table('users')->where('email', '=', $object->email)->update(array('password' => Hash::make($object->password)) );

		//$password = DB::table('users')->where('email', '=', $object->email)->only('password');

		Message::to($object->email)
		    ->from('nicolachernobaev@gmail.com', 'Цитабаза')
		    ->subject('Восстановление пароля Цитабазы.')
		    ->body('Здравствуйте, ' . $user->username  . '. Ваш новый пароль ' . $object->password )
		    ->html(true)
		    ->send();

		
		return json_encode($object->email);
    }

}