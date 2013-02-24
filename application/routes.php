<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Simply tell Laravel the HTTP verbs and URIs it should respond to. It is a
| breeze to setup your application using Laravel's RESTful routing and it
| is perfectly suited for building large applications and simple APIs.
|
| Let's respond to a simple GET request to http://example.com/hello:
|
|		Route::get('hello', function()
|		{
|			return 'Hello World!';
|		});
|
| You can even respond to more than one URI:
|
|		Route::post(array('hello', 'world'), function()
|		{
|			return 'Hello World!';
|		});
|
| It's easy to allow URI wildcards using (:num) or (:any):
|
|		Route::put('hello/(:any)', function($name)
|		{
|			return "Welcome, $name.";
|		});
|
*/


// Route::get('*', function()
// {
// 	return View::make('home.index');
// });


Route::get('/', function()
{
	return View::make('home.index');
});


//как по уму - с контроллерами надо
//Route::get('/', array('as' => 'home' , 'uses' => 'questions@index'));
//Route::get('register', array('as' => 'register', 'uses' => 'users@new'));
//Route::post('register', array('before' => 'csrf', 'uses' => 'users@create'));


//логин
Route::post('/login', function()
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


	// Session::put('name', 'Taylor');
	// Session::put('name', 'Taylor');
});


//разлогирование
Route::post('/logout', function()
{

	Auth::logout();

	print_r(Auth::logout());

	return true;
});


//регистрация
Route::post('/registration', function()
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

});


//отсылка письма на восстановление пароля, если пользователь забыл
Route::post('/forget', function()
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

});



//изменение старого пароля на новый, если пользователь забыл
Route::post('/recovery', function()
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

});


//запись цитаты пользователя в БД
Route::post('/quotes/(:num)', function($user_id)
{
	//данные полученые из ввода формы с клиента в json
	$input = Input::json();

	//короткий способ
	$quote = Quote::create(array(
		'user_id' => $input->user_id,
		'quote'   => $input->quote,
		'author'  => $input->author
	));

	//длинный способ
	// //создали новый экземпляр Цитаты
	// $quote = new Quote;

	// //вбили в него данные полученные с клиента
	// $quote->user_id = $input->user_id;
	// $quote->quote = $input->quote;
	// $quote->author = $input->author;

	// //сохранили в БД
	// $quote->save();

});



//выборка АБСОЛЮТНО всех цитат из БД
Route::get('/quotes', function() 
{
	
	//выбрали все цитаты
	$user_quotes = Quote::all();

	//создаем пустой массив
	$new_quotes = array();

	//циклом пробегаемся по отобранным цитатам юзера, и 
	//выхватываем из каждой только параметр original - это параметр с данными цитаты
	//каждый original забиваем  в  $new_quotes
	foreach ($user_quotes as $quote) {
		$new_quotes[]=$quote->original;
	}

	//возвращаем отобранные цитаты в json
	return json_encode($new_quotes);

});




//выборка всех цитат пользователя из БД
Route::get('/quotes/(:num)', function($id) 
{
	
	//выбрали только цитаты данного юзера
	$user_quotes = Quote::where('user_id', '=', $id)->get();

	//создаем пустой массив
	$new_quotes = array();

	//циклом пробегаемся по отобранным цитатам юзера, и 
	//выхватываем из каждой только параметр original - это параметр с данными цитаты
	//каждый original забиваем  в  $new_quotes
	foreach ($user_quotes as $quote) {
		$new_quotes[]=$quote->original;
	}

	//возвращаем отобранные цитаты в json
	return json_encode($new_quotes);

});


//изменение цитаты пользователя в БД
Route::put('/quotes/(:num)/(:num)', function($user_id, $quote_id)
{
	//находим эту цитату в БД и сохраняем в объект quote
	$quote = Quote::find($quote_id);

	//данные с изменениями пришедшеит м клиента
	$input = Input::json();

	//запихиваем в объект цитаты измененный и пришедщие с клиента данные
	$quote->quote = $input->quote;
	$quote->author = $input->author;

	//сохраняем новую измененную цитату  в БД
	$quote->save();

});



//удаление цитаты пользователя из БД
Route::delete('/quotes/(:num)/(:num)', function($user_id, $quote_id)
{
	//находим в БД эту цитату и удаляем ее!
	return Quote::find($quote_id)->delete();
});



/*
|--------------------------------------------------------------------------
| Application 404 & 500 Error Handlers
|--------------------------------------------------------------------------
|
| To centralize and simplify 404 handling, Laravel uses an awesome event
| system to retrieve the response. Feel free to modify this function to
| your tastes and the needs of your application.
|
| Similarly, we use an event to handle the display of 500 level errors
| within the application. These errors are fired when there is an
| uncaught exception thrown in the application.
|
*/

Event::listen('404', function()
{
	return Response::error('404');
});

Event::listen('500', function()
{
	return Response::error('500');
});

/*
|--------------------------------------------------------------------------
| Route Filters
|--------------------------------------------------------------------------
|
| Filters provide a convenient method for attaching functionality to your
| routes. The built-in before and after filters are called before and
| after every request to your application, and you may even create
| other filters that can be attached to individual routes.
|
| Let's walk through an example...
|
| First, define a filter:
|
|		Route::filter('filter', function()
|		{
|			return 'Filtered!';
|		});
|
| Next, attach the filter to a route:
|
|		Router::register('GET /', array('before' => 'filter', function()
|		{
|			return 'Hello World!';
|		}));
|
*/

Route::filter('before', function()
{
	// Do stuff before every request to your application...
});

Route::filter('after', function($response)
{
	// Do stuff after every request to your application...
});

Route::filter('csrf', function()
{
	if (Request::forged()) return Response::error('500');
});

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::to('login');
});