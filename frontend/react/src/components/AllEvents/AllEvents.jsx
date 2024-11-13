import './AllEvents.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../store/reducers/eventReducer';

const AllEvents = () => {
	const dispatch = useDispatch();
	const events = useSelector((state) => state.events.AllEvents);

	useEffect(() => {
		dispatch(fetchAllEvents());
	}, [dispatch]);

	return (
		<div className='events-wrapper'>
			{events && events.length > 0 ? (
				events.map((event) => (
					<div
						className='event-structure'
						key={event.id}
					>
						<h3 className='event-title'>{event.name}</h3>
						<p className='event-description'>{event.description}</p>
						<p className='event-category'>Category: {event.category}</p>
					</div>
				))
			) : (
				<p>No events available.</p>
			)}
		</div>
	);
};

export default AllEvents;
