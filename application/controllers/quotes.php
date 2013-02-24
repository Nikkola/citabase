<?php

class Quotes_Controller extends Base_Controller {    

	public function action_index()
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
    }    


	public function action_store($user_id)
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
    }    

	public function action_show($id)
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
    }  


	public function action_update($user_id, $quote_id)
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
    }    

	public function action_destroy($user_id, $quote_id)
    {
	 	//находим в БД эту цитату и удаляем ее!
		return Quote::find($quote_id)->delete();      
    }

}