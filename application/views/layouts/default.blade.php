<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>{{ $title }}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	{{ HTML::style('css/style.css') }}
	{{ HTML::style('css/normalize.css') }}
	{{ HTML::style('css/bootstrap.css') }}
	{{ HTML::style('css/bootstrap-responsive.css') }}
</head>
	<div id="container">
		<div id="header">
			{{ HTML::link('/', 'Цитабаза - Вопросы и ответы') }}
		</div>

		<div id="nav">
			<ul>
				<li>{{ HTML::link_to_route('home', 'Home') }}</li>
				<li>{{ HTML::link_to_route('register', 'Register') }}</li>
				<li>{{ HTML::link('/', 'Login') }}</li>
			</ul>
		</div>

	</div>

	<div id="content">
		@if(Session::has('message'))
			<p id="message">{{ Session::get('message') }} </p>
		@endif
		
		@yield('content')	
	</div>

	<div id="footer">
		&copy; Цитабаза {{ date('Y') }}
	</div>