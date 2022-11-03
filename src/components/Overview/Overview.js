import './Overview.css';
import { NavLink } from 'react-router-dom';
import Kitchen from '../../assets/kitchen-icon.png';

const Overview = () => {
	return (
		<article className='overview'>
			<p>
				Have you ever bought food that ends up sitting in your freezer too long,
				expires, or goes to waste because you didn't eat it in time? Of course
				you have, we all do sometimes. What can we do with this food
				that we don't end up eating? Welcome to Waste Not, Want Not.
			</p>
			<p>
				You can use Waste Not, Want Not to track the food that you purchase,
				expiration dates, and get connected to local food banks to donate your
				unwanted food. Add foods to your pantry, fridge or freezer on the "My Kitchen page." 
				where you can view foods by location, or all foods by expiration date. From here mark foods for donation or click "ate" to delete from your kitchen.
			</p>
			<p>
				Head over to the Donation Page to see foods marked for donations and use the search function to find a local food bank near you!
			</p>
			<h1>Let's work together to mitigate food waste!</h1>
			<NavLink to='/mykitchen'>
				<div className='nav-container'>
					<img src={Kitchen} alt='kitchen logo' className='nav-button' />
					<label>Continue To Your Kitchen</label>
				</div>
			</NavLink>
		</article>
	);
};

export default Overview;
