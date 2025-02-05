import React from 'react';

const EditSeminar = ({ seminar, onSave, onCancel, onChange }) => {
  return (
    <div>
      <h2>Edit Seminar</h2>
      <input
        type="text"
        name="title"
        value={seminar.title}
        onChange={onChange}
      />
      <input
        type="date"
        name="date"
        value={seminar.date}
        onChange={onChange}
      />
      <textarea
        name="description"
        value={seminar.description}
        onChange={onChange}
      />
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditSeminar;