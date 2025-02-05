// Компонент для кнопки удаления семинара
const DeleteSeminar = ({ seminar, onDelete }) => {
  
  // Функция, которая вызывается при нажатии на кнопку удаления
  const handleDelete = () => {
    // Подтверждаем действие с помощью окна подтверждения
    if (window.confirm('Are you sure you want to delete this seminar?')) {
      // Если пользователь подтвердил, вызываем функцию onDelete с id семинара
      onDelete(seminar.id);
    }
  };
  
  // Рендерим кнопку, при нажатии на которую вызывается handleDelete
  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteSeminar; 