import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExercise, setFilter } from '../../store';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import './ExerciseList.css';

function ExerciseList() {
  const exercises = useSelector((state) => state.exercises.exercises);
  const filter = useSelector((state) => state.exercises.filter);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  const muscleGroups = ['Все', 'Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Пресс'];

  const filteredExercises = filter === 'Все' 
    ? exercises 
    : exercises.filter(ex => ex.muscleGroup === filter);

  const handleDelete = (id) => {
    if (window.confirm('Удалить это упражнение?')) {
      dispatch(deleteExercise(id));
    }
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingExercise(null);
    setIsModalOpen(true);
  };

  const getMuscleIcon = (muscleGroup) => {
    const icons = {
      'Грудь': '💪',
      'Спина': '🏋️',
      'Ноги': '🦵',
      'Плечи': '🤸',
      'Руки': '💪',
      'Пресс': '🔥'
    };
    return icons[muscleGroup] || '⚡';
  };

  return (
    <section id="exercises" className="exercises-section">
      <div className="exercises-container">
        <div className="section-header">
          <h1>Мои тренировки</h1>
          <p>Отслеживай свой прогресс в зале</p>
        </div>

        <div className="filter-bar">
          <div className="filters">
            {muscleGroups.map(group => (
              <button
                key={group}
                className={`filter-btn ${filter === group ? 'active' : ''}`}
                onClick={() => dispatch(setFilter(group))}
              >
                {group}
              </button>
            ))}
          </div>
          <button className="add-exercise-btn" onClick={handleAddNew}>
            <span>+</span> Добавить упражнение
          </button>
        </div>

        <div className="exercises-stats">
          <div className="stat-card">
            <h3>{filteredExercises.length}</h3>
            <p>Упражнений</p>
          </div>
          <div className="stat-card">
            <h3>{filteredExercises.reduce((sum, ex) => sum + ex.sets * ex.reps, 0)}</h3>
            <p>Всего повторений</p>
          </div>
          <div className="stat-card">
            <h3>{filteredExercises.reduce((sum, ex) => sum + ex.calories, 0)}</h3>
            <p>Калорий сожжено</p>
          </div>
        </div>

        <div className="exercises-grid">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <div className="exercise-header">
                <div className="exercise-icon">
                  {getMuscleIcon(exercise.muscleGroup)}
                </div>
                <div className="exercise-badge">{exercise.muscleGroup}</div>
              </div>
              
              <h3>{exercise.name}</h3>
              
              <div className="exercise-details">
                <div className="detail-item">
                  <span className="detail-label">Подходы</span>
                  <span className="detail-value">{exercise.sets}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Повторения</span>
                  <span className="detail-value">{exercise.reps}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Вес (кг)</span>
                  <span className="detail-value">{exercise.weight || 'Свой вес'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Калории</span>
                  <span className="detail-value">{exercise.calories} ккал</span>
                </div>
              </div>

              <div className="exercise-date">
                📅 {new Date(exercise.date).toLocaleDateString('ru-RU')}
              </div>

              <div className="exercise-actions">
                <button className="btn-edit" onClick={() => handleEdit(exercise)}>
                  ✏️ Редактировать
                </button>
                <button className="btn-delete" onClick={() => handleDelete(exercise.id)}>
                  🗑️ Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="empty-state">
            <h2>😔 Упражнений не найдено</h2>
            <p>Добавьте первое упражнение, чтобы начать отслеживать прогресс</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddExerciseModal 
          onClose={() => setIsModalOpen(false)}
          exercise={editingExercise}
        />
      )}
    </section>
  );
}

export default ExerciseList;