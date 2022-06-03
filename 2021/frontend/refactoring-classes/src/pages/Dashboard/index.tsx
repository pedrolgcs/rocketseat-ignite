import { useState, useEffect } from 'react';

// components
import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

// services
import api from '../../services/api';

// styles
import { FoodsContainer } from './styles';

// types
import { TFood } from '../../utils/types/food';

function NewDashboard() {
  const [foods, setFoods] = useState<TFood[]>([]);
  const [editingFood, setEditingFood] = useState({} as TFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods() {
      const { data } = await api.get('/foods');
      setFoods(data);
    }

    loadFoods();
  }, []);

  async function handleAddFood(food: TFood) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(updateFood: TFood) {
    try {
      const { data: foodUpdated } = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...updateFood,
      });

      const foodsUpdated = foods.map((food) =>
        food.id !== foodUpdated.id ? food : foodUpdated
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: TFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default NewDashboard;
