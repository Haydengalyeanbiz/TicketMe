import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../../store/reducers/eventReducer';
import { MdOutlineSportsFootball } from 'react-icons/md';
import { LiaGuitarSolid } from 'react-icons/lia';
import { FaTheaterMasks } from 'react-icons/fa';
import { FaRegLaughSquint } from 'react-icons/fa';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import './Categories.css';

const Categories = () => {
	const dispatch = useDispatch();
	const selectedCategory = useSelector(
		(state) => state.events.selectedCategory
	);

	const handleCategoryClick = (category) => {
		dispatch(setSelectedCategory(category));
	};

	return (
		<div className='categories-wrapper'>
			<button
				onClick={() => handleCategoryClick('Sports')}
				className={selectedCategory === 'Sports' ? 'active-category' : ''}
			>
				Sports <MdOutlineSportsFootball />
			</button>
			<button
				onClick={() => handleCategoryClick('Concerts')}
				className={selectedCategory === 'Concerts' ? 'active-category' : ''}
			>
				Concerts <LiaGuitarSolid />
			</button>
			<button
				onClick={() => handleCategoryClick('Arts')}
				className={selectedCategory === 'Arts' ? 'active-category' : ''}
			>
				Arts <FaTheaterMasks />
			</button>
			<button
				onClick={() => handleCategoryClick('Comedy')}
				className={selectedCategory === 'Comedy' ? 'active-category' : ''}
			>
				Comedy <FaRegLaughSquint />
			</button>
			<button
				onClick={() => handleCategoryClick('Family')}
				className={selectedCategory === 'Family' ? 'active-category' : ''}
			>
				Family <MdOutlineFamilyRestroom />
			</button>
			<button onClick={() => handleCategoryClick(null)}>All Categories</button>
		</div>
	);
};

export default Categories;
