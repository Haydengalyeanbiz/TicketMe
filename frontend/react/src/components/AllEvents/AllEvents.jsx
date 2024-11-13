import './AllEvents.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../store/reducers/eventReducer';

const AllEvents = () => {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events.allEvents);
	const selectedCategory = useSelector(
		(state) => state.events.selectedCategory
	);

	useEffect(() => {
		dispatch(fetchAllEvents());
	}, [dispatch]);

	const filteredEvents = selectedCategory
		? events.filter((event) => event.category === selectedCategory)
		: events;

	return (
		<div className='events-wrapper'>
			{filteredEvents.length > 0 ? (
				filteredEvents.map((event) => (
					<div
						key={event.id}
						className='event-structure'
					>
						<h3>{event.name}</h3>
						<p>{event.description}</p>
						<p>Category: {event.category}</p>
					</div>
				))
			) : (
				<p>No events available.</p>
			)}
		</div>
	);
};

export default AllEvents;
