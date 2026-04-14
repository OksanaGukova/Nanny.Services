import { useState } from 'react';
import css from './HandleAddNanny.module.css';

export default function AddNannyModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    avatar_url: '',
    birthday: '',
    experience: '',
    education: '',
    kids_age: '',
    price_per_hour: '',
    location: '',
    about: '',
    characters: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const hasEmpty = Object.values(form).some(v => String(v).trim() === '');
  if (hasEmpty) {
    alert('Please fill all fields');
    return;
  }

const formattedData = {
  ...form,
  birthday: new Date(form.birthday).toISOString(), // 🔥 FIX
  price_per_hour: Number(form.price_per_hour),
  characters: form.characters
    .split(',')
    .map(c => c.trim())
    .filter(Boolean),
  rating: 1,
};

if (!formattedData.characters.length) {
  alert("Add at least one character");
  return;
}

if (!formattedData.price_per_hour) {
  alert("Invalid price");
  return;
}

  try {
    await onSubmit(formattedData);
    onClose();
  } catch (error) {
    console.error("❌ Create nanny error:", error);
    
  }
};

  return (
    <div className={css.modalBackdrop} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>✖</button>

        <h2 className={css.title}>Add Nanny</h2>

        <form className={css.form} onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="avatar_url" placeholder="Avatar URL" onChange={handleChange} />
          <input name="birthday" type="date" onChange={handleChange} />
          <input name="experience" placeholder="Experience (e.g. 5 years)" onChange={handleChange} />
          <input name="education" placeholder="Education" onChange={handleChange} />
          <input name="kids_age" placeholder="Kids age (e.g. 2-6)" onChange={handleChange} />
          <input name="price_per_hour" type="number" placeholder="Price per hour" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <textarea name="about" placeholder="About" onChange={handleChange} />
          <input name="characters" placeholder="Characters (comma separated)" onChange={handleChange} />

          <button type="submit" className={css.submitBtn}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}