<h1> Задания для 2 этапа </h1>
<p>
1. Спроектирвоать базу для хранения фильмов
<br>База должна давать возможность хранить информацию как на странице: https://www.kinopoisk.ru/film/435/
<br>- Для хранения художников, композиторов, монтажеров и пр используем одну таблицу person
<br>-- упрощаем и чтобы не плодить кучу таблиц только в главных ролях и роли дублировали будут иметь (film-person) связь многие ко многим
<br>-- для остальных ставим связь один ко многим (поэтому в графе сценарий у нас для фильма будет всего один сценарист [например, только Фрэнк Дарабонт], аналогично и по другим полям персон)
<br>- Жанры также хранятся в отдельной таблице исвязываются далее с фильмами
<br>- зрители по странам тоже в отдельной таблице (флажки можно не хранить)
  
<br><h4>Модель БД</h4>
![](https://github.com/vivir-para-volar/homework-2/blob/main/task-1/db-model.PNG)
  
<br><br>2. Написать маленький сервер на nodeJS, который работает с упрощенной базой данных фильмов
<br>- таблица жанров
<br>-pk
<br>-- название жанра
<br>- таблица фильмов
<br>-- pk
<br>-- название
<br>-- год выпуска
<br>у каждого фильма может быть несколько жанров
<br>Реализовать на nodeJS CRUD опреации для взаимодействия с жанрами с CRUD операции для взаимодействия с фильмами.
<br>Тестировать свою работу можно через postman. В качестве результатов сервер просто возвращает данные в JSON формате.
</p>
