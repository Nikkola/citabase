<?php

class Quotes_Base {

	/**
	 * Make changes to the database.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('quotes', function($table) {
			$table->increments('id');
			$table->integer('user_id')->references('id')->on('users');
			$table->string('quote');
			$table->string('author');
			$table->timestamps();
		});
	}

	/**
	 * Revert the changes to the database.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('quotes');
	}

}