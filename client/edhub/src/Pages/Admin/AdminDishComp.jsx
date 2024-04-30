import React from 'react'

function AdminDishComp() {
    const [softDrinks, setSoftDrinks] = useState([]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/softdrinks');
        console.log(response.data)
        setSoftDrinks(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    fetchDishes();
  }, []);
  return (
    <div>AdminDishComp</div>
  )
}

export default AdminDishComp