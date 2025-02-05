import React, { useState, useEffect } from 'react'; 
import Modal from './Modal'; 
import '../styles/App.css';

const App = () => {
  // Состояния компонента:
  const [seminars, setSeminars] = useState([]); // Храним список семинаров
  const [isEditing, setIsEditing] = useState(false); // Флаг для проверки, редактируется ли семинар
  const [editingSeminar, setEditingSeminar] = useState(null); // Храним данные редактируемого семинара
  const [loading, setLoading] = useState(true); // Флаг загрузки данных

  // useEffect срабатывает при монтировании компонента
  useEffect(() => {
    // Запрашиваем данные с json-server
    fetch("http://localhost:5000/seminars")
      .then((response) => response.json()) // Преобразуем ответ в JSON
      .then((data) => {
        setSeminars(data); // Обновляем список семинаров
        setLoading(false); // Завершаем загрузку данных
      })
      .catch((error) => console.error("Error fetching seminars:", error)); // Обработка ошибок
  }, []); // Пустой массив означает, что useEffect сработает только один раз, когда компонент загрузится

  // Функция для удаления семинара
  const deleteSeminar = (id) => {
    // Подтверждаем удаление
    if (window.confirm("Are you sure you want to delete this seminar?")) {
      // Выполняем запрос на удаление семинара по id
      fetch(`http://localhost:5000/seminars/${id}`, {
        method: "DELETE", // Указываем метод DELETE
      })
        .then(() => {
          // Обновляем список семинаров, удаляя тот, который был удален
          setSeminars(seminars.filter((seminar) => seminar.id !== id));
        })
        .catch((error) => console.error("Error deleting seminar:", error)); // Обработка ошибок
    }
  };

  // Функция для начала редактирования семинара
  const handleEdit = (seminar) => {
    setIsEditing(true); // Включаем режим редактирования
    setEditingSeminar(seminar); // Устанавливаем семинар, который будем редактировать
  };

  // Функция для сохранения изменений семинара
  const handleSave = () => {
    // Отправляем обновленные данные семинара на сервер
    fetch(`http://localhost:5000/seminars/${editingSeminar.id}`, {
      method: "PUT", // Указываем метод PUT для обновления
      headers: {
        "Content-Type": "application/json", // Указываем тип данных
      },
      body: JSON.stringify(editingSeminar), // Отправляем обновленные данные семинара
    })
      .then(() => {
        // Обновляем список семинаров, заменяя измененный
        setSeminars(
          seminars.map((seminar) =>
            seminar.id === editingSeminar.id ? editingSeminar : seminar
          )
        );
        setIsEditing(false); // Останавливаем режим редактирования
        setEditingSeminar(null); // Сбрасываем редактируемый семинар
      })
      .catch((error) => console.error("Error updating seminar:", error)); // Обработка ошибок
  };

  // Функция для отслеживания изменений в форме редактирования
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingSeminar((prev) => ({
      ...prev, // Оставляем прежние данные
      [name]: value, // Обновляем поле, которое изменилось
    }));
  };

  // Функция для закрытия модального окна
  const handleClose = () => {
    setIsEditing(false); // Останавливаем редактирование
    setEditingSeminar(null); // Сбрасываем редактируемый семинар
  };

  // Если данные еще загружаются, показываем сообщение
  if (loading) {
    return <p>Loading seminars...</p>;
  }

  return (
    <div>
      <h1>Семинары</h1>
      {/* Отображаем список семинаров */}
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar.id}>
            <h3>{seminar.title}</h3>
            <p>{seminar.date}</p>
            <p>{seminar.description}</p>
            <img src={seminar.photo} alt={seminar.title} width="200" />
            {/* Кнопки для редактирования и удаления */}
            <button onClick={() => handleEdit(seminar)}>Edit</button>
            <button onClick={() => deleteSeminar(seminar.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Модальное окно для редактирования, которое появляется, если isEditing true */}
      {isEditing && (
        <Modal
          seminar={editingSeminar}
          onSave={handleSave} // Передаем функцию сохранения
          onChange={handleChange} // Передаем функцию для обновления данных
          onClose={handleClose} // Передаем функцию для закрытия окна
        />
      )}
    </div>
  );
};

export default App;
