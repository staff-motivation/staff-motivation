import './MyTask.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MyTask({ task, onClick }) {
	const { status, reward_points, title, deadline, id } = task;
	const date = new Date(deadline);
	const options = { day: 'numeric', month: 'long' };
	const formattedDate = date.toLocaleDateString('ru-RU', options);

	const [statusName, setStatusName] = useState('');
	const [disadledButton, setDisadledButton] = useState(false);
	const [titleClassName, setTitleClassName] = useState('mytask__title');
	const [statusClassName, setStatusClassName] = useState('mytask__status');
	const [ballsClassName, setBallsClassName] = useState('mytask__score');
	const [deadlineData, setDeadlieneData] = useState(formattedDate);
	const [dataClass, setDataClass] = useState('mytask__data');
	const [disablePopup, setDisablePopup] = useState(false);

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'is_overdue') {
			setTitleClassName('mytask__title mytask__title-missed');
			setStatusClassName('mytask__status mytask__status-missed');
			setBallsClassName('mytask__score mytask__score-missed');
			setStatusName('истёк срок задачи');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'approve') {
			setStatusClassName('mytask__status mytask__status-prove');
			setBallsClassName('mytask__score mytask__score-done');
			setTitleClassName('mytask__title mytask__title-done');
			setStatusName('подтверждено');
			setDisadledButton(true);
			setDeadlieneData(`Выполнено`);
			setDataClass('mytask__data mytask__data-done');
			setDisablePopup(true);
		}
	}, [status]);

	useEffect(() => {
		if (status === 'sent_for_review') {
			setStatusName('на подтверждении');
			setDeadlieneData(`Выполнено`);
			setDisadledButton(true);
			setTitleClassName('mytask__title mytask__title-done');
			setDisablePopup(true);
		}
	}, [status]);

	useEffect(() => {
		if (status === 'rejected') {
			setStatusName('на доработке');
		}
	}, [status]);

	return (
		<div
			className={!disablePopup ? 'mytask' : 'mytask__no-hover'}
			onClick={() => onClick(id, disablePopup)}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<p className={titleClassName}>{title}</p>
			<p className={ballsClassName}>{reward_points} баллов</p>
			<p className={statusClassName}>{statusName}</p>
			<p className={dataClass}>{deadlineData}</p>
			<button className="mytask__button" disabled={disadledButton}>
				Подтвердить выполнение
			</button>
		</div>
	);
}
export default MyTask;

MyTask.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string,
		status: PropTypes.string,
		reward_points: PropTypes.number,
		deadline: PropTypes.string,
		id: PropTypes.number,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
