import React from 'react'; 
import '../styles/Modal.css';

// Компонент модального окна для редактирования семинара
const Modal = ({ seminar, onSave, onChange, onClose }) => {
  
  // Если семинар не выбран, модальное окно не будет отображаться
  if (!seminar) return null;

  return (
    // Оверлей для модального окна (полупрозрачный фон)
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактировать</h2>
        
        {/* Поле для редактирования заголовка */}
        <label>Заголовок</label>
        <input
          type="text" // Текстовое поле для ввода названия
          name="title" // Имя поля для обработки изменений
          value={seminar.title} // Значение поля равно текущему названию семинара
          onChange={onChange} // При изменении вызываем onChange для обновления данных
        />
        
        {/* Поле для редактирования даты */}
        <label>Дата</label>
        <input
          type="date" // Тип input для выбора даты
          name="date" // Имя поля для обработки изменений
          value={seminar.date} // Значение поля равно текущей дате семинара
          onChange={onChange} // При изменении вызываем onChange для обновления данных
        />
        
        {/* Поле для редактирования описания */}
        <label>Описание</label>
        <textarea
          name="description" // Имя поля для обработки изменений
          value={seminar.description} // Значение поля равно текущему описанию семинара
          onChange={onChange} // При изменении вызываем onChange для обновления данных
        />
        
        {/* Кнопки для сохранения или отмены изменений */}
        <div>
          <button onClick={onSave}>Сохранить</button> {/* Кнопка для сохранения изменений */}
          <button onClick={onClose}>Закрыть</button> {/* Кнопка для отмены изменений и закрытия модального окна */}
        </div>
      </div>
    </div>
  );
};

export default Modal; 
